package controllers

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"

	"github.com/darkcl/Notorious/models"
	guuid "github.com/google/uuid"
)

// CodeExecutionController - execute code snippet
type CodeExecutionController struct {
	Task *models.CodeExecutaion `json:"task,omitempty"`
}

// NewCodeExecutionController - create new code execution controller
func NewCodeExecutionController() *CodeExecutionController {
	return &CodeExecutionController{}
}

// Execute - execute code snippet
func (c *CodeExecutionController) Execute(language string, code string) {

	if canExecute(language) {
		dir, err := ioutil.TempDir("", "notorious")
		if err != nil {
			fmt.Println(err)
			panic(err)
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
		if err := ioutil.WriteFile(tmpFile, []byte(code), 0666); err != nil {
			fmt.Println(err)
			panic(err)
		}

		cmd := exec.Command(langToCmd(language), tmpFile)
		var stdout, stderr bytes.Buffer
		cmd.Stdout = &stdout
		cmd.Stderr = &stderr
		err = cmd.Run()
		if err != nil {
			c.Task.Error = err.Error()
			c.Task.IsCompleted = true
			return
		}
		c.Task.IsCompleted = true
		outStr, errStr := string(stdout.Bytes()), string(stderr.Bytes())
		c.Task.Output = outStr
		c.Task.Error = errStr

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
