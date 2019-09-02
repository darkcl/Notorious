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

// CodeExecutaionRequest - descripe a code execution request
type CodeExecutaionRequest struct {
	Language     string `json:"language"`
	CodeSnippent string `json:"code"`
}

// CodeExecutaionResponse - descripe a code execution response
type CodeExecutaionResponse struct {
	Error  string `json:"error,omitempty"`
	Output string `json:"output,omitempty"`
}
