package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"

	"github.com/darkcl/Notorious/models"
	"github.com/mitchellh/go-homedir"
)

// SettingsController - Settings Controller
type SettingsController struct {
	Settings *models.Settings `json:"settings"`
	path     string
}

// NewSettingsController - Create Settings Controller
func NewSettingsController() *SettingsController {
	path, err := homedir.Dir()

	if err != nil {
		panic(err)
	}
	settingPath := filepath.Join(path, ".notorious", "settings.json")
	var settings *models.Settings
	if _, err := os.Stat(settingPath); os.IsNotExist(err) {
		settings = &models.Settings{
			LastOpenFile:      "",
			LastOpenWorkspace: "",
			JiraSettings: &models.Jira{
				BaseURL:     "",
				UserName:    "",
				AccessToken: "",
			},
		}
		writeFile(settings)
	} else {
		data, _ := ioutil.ReadFile(settingPath)
		json.Unmarshal(data, &settings)
	}
	return &SettingsController{
		Settings: settings,
	}
}

// UpdateSettings - Update Settings
func (s *SettingsController) UpdateSettings(settings string) {
	fmt.Println(settings)
	var newSetting models.Settings
	json.Unmarshal([]byte(settings), &newSetting)

	s.Settings.LastOpenFile = newSetting.LastOpenFile
	s.Settings.LastOpenWorkspace = newSetting.LastOpenWorkspace
	s.Settings.JiraSettings.BaseURL = newSetting.JiraSettings.BaseURL
	s.Settings.JiraSettings.UserName = newSetting.JiraSettings.UserName
	s.Settings.JiraSettings.AccessToken = newSetting.JiraSettings.AccessToken
	writeFile(s.Settings)
}

func writeFile(data *models.Settings) {
	path, err := homedir.Dir()

	if err != nil {
		panic(err)
	}

	file, _ := json.MarshalIndent(data, "", " ")
	settingPath := filepath.Join(path, ".notorious", "settings.json")

	_ = ioutil.WriteFile(settingPath, file, 0644)
}
