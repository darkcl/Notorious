package models

// CodeExecutaion - describe a code execution task
type CodeExecutaion struct {
	TaskID      string `json:"id"`
	CodeSnippet string `json:"codeSnippet"`
	Language    string `json:"language"`
	IsCompleted bool   `json:"isCompleted"`
	Output      string `json:"output"`
	Error       string `json:"error,omitempty"`
}
