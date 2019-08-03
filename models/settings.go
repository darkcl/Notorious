package models

// Settings - Settings Model
type Settings struct {
	LastOpenFile      string `json:"lastOpenFile"`
	LastOpenWorkspace string `json:"lastOpenWorkspace"`
	JiraSettings      *Jira  `json:"jira"`
}

// Jira - Jira Settings Model
type Jira struct {
	BaseURL     string `json:"baseUrl"`
	UserName    string `json:"user"`
	AccessToken string `json:"accessToken"`
}
