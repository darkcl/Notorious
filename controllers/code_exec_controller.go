package controllers

import (
	"bytes"
	"fmt"
	"io/ioutil"
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
		fmt.Printf("Write code file to %s", tmpFile)
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
			fmt.Printf("cmd.Run() failed with %s\n", err)
		}
		c.Task.IsCompleted = true
		outStr, errStr := string(stdout.Bytes()), string(stderr.Bytes())
		c.Task.Output = outStr
		c.Task.Error = errStr
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
		"python":
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
	}
	return ""
}
