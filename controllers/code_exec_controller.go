package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"

	"github.com/darkcl/Notorious/ipc"
	"github.com/darkcl/Notorious/models"
	guuid "github.com/google/uuid"
)

var (
	responseCode = "code-exec-response"
)

// CodeExecutionController - execute code snippet
type CodeExecutionController struct {
	Task *models.CodeExecutaion `json:"task,omitempty"`
}

// NewCodeExecutionController - create new code execution controller
func NewCodeExecutionController() *CodeExecutionController {
	return &CodeExecutionController{}
}

func hasError(err error) bool {
	if err != nil {
		ipcMain := ipc.SharedMain()
		ipcMain.Send(responseCode, &models.CodeExecutaionResponse{
			Error: err.Error(),
		})
		return true
	}
	return false
}

// ParseAndExecute - parse json request and execute code snippet
func (c *CodeExecutionController) ParseAndExecute(val string) {
	var req models.CodeExecutaionRequest
	err := json.Unmarshal([]byte(val), &req)
	if hasError(err) {
		fmt.Printf("Error on parsing requesst: %s\n", val)
		return
	}
	c.Execute(req.Language, req.CodeSnippent)
}

// Execute - execute code snippet
func (c *CodeExecutionController) Execute(language string, code string) {

	if canExecute(language) {
		dir, err := ioutil.TempDir("", "notorious")
		if hasError(err) {
			fmt.Println(err)
			return
		}
		fileID := guuid.New()
		c.Task = &models.CodeExecutaion{
			TaskID:      fileID.String(),
			CodeSnippet: code,
			Language:    language,
			IsCompleted: false,
			Output:      "",
			Error:       "",
		}
		tmpFile := filepath.Join(dir, fileID.String())
		defer os.Remove(tmpFile)
		if err := ioutil.WriteFile(tmpFile, []byte(code), 0666); hasError(err) {
			fmt.Println(err)
			return
		}

		cmd := exec.Command(langToCmd(language), tmpFile)
		var stdout, stderr bytes.Buffer
		cmd.Stdout = &stdout
		cmd.Stderr = &stderr
		err = cmd.Run()
		if hasError(err) {
			return
		}
		c.Task.IsCompleted = true
		outStr, errStr := string(stdout.Bytes()), string(stderr.Bytes())
		c.Task.Output = outStr
		c.Task.Error = errStr

		ipcMain := ipc.SharedMain()
		ipcMain.Send(responseCode, &models.CodeExecutaionResponse{
			Output: outStr,
			Error:  errStr,
		})

		fmt.Println(outStr)
		fmt.Println(errStr)
	}

}

// Clear - clear the task
func (c *CodeExecutionController) Clear() {
	c.Task = nil
}

// Private function

func canExecute(language string) bool {
	switch language {
	case
		"ruby",
		"rb",
		"python",
		"js",
		"javascript":
		return true
	}
	return false
}

func langToCmd(language string) string {
	switch language {
	case
		"ruby",
		"rb":
		return "ruby"
	case
		"python":
		return "python"
	case
		"js",
		"javascript":
		return "/usr/local/bin/node"
	}
	return ""
}
