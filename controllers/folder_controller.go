package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path"
	"path/filepath"

	"github.com/darkcl/Notorious/lib/webview"
	"github.com/darkcl/Notorious/models"
	"github.com/mitchellh/go-homedir"
)

// FolderController - Folder Controller
type FolderController struct {
	Folder         *models.Folder `json:"folderTree"`
	CurrentContent string         `json:"currentContent,omitempty"`
	CurrentPath    string         `json:"currentPath,omitempty"`
	webView        webview.WebView
}

// NewFolderController - Create New Folder Controller
func NewFolderController(webView webview.WebView) *FolderController {
	path, err := homedir.Dir()

	if err != nil {
		panic(err)
	}
	settingPath := filepath.Join(path, ".notorious")
	folders := buildTree(settingPath)
	data, _ := json.Marshal(folders)
	fmt.Println(string(data))
	return &FolderController{
		webView: webView,
		Folder:  folders,
	}
}

// Clear - clear current folder tree
func (f *FolderController) Clear() {
	f.Folder = nil
}

// Create - create a file
func (f *FolderController) Create(title string, workspace string) {
	notePath := filepath.Join(f.Folder.Path, workspace, fmt.Sprintf("%s.md", title))
	noteContent := []byte(fmt.Sprintf("# %s", title))
	err := ioutil.WriteFile(notePath, noteContent, 0644)

	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	path, err := homedir.Dir()

	if err != nil {
		panic(err)
	}
	settingPath := filepath.Join(path, ".notorious")
	f.Open(notePath)
	f.Folder = buildTree(settingPath)
}

// Open - open a file with path
func (f *FolderController) Open(path string) {

	data, err := ioutil.ReadFile(path) // just pass the file name
	if err != nil {
		fmt.Print(err)
		return
	}

	f.CurrentContent = string(data)
	f.CurrentPath = path
}

// Save - save data to path
func (f *FolderController) Save(content string) {
	err := ioutil.WriteFile(f.CurrentPath, []byte(content), 0644)
	if err != nil {
		fmt.Print(err)
		return
	}
	f.CurrentContent = content
}

// CreateWorkspace - create a workspace
func (f *FolderController) CreateWorkspace(name string) {
	path, err := homedir.Dir()

	if err != nil {
		panic(err)
	}
	workspacePath := filepath.Join(path, ".notorious", name)

	if _, err := os.Stat(workspacePath); os.IsNotExist(err) {
		os.Mkdir(workspacePath, os.ModePerm)
	}

	f.Folder = buildTree(filepath.Join(path, ".notorious"))
}

// OpenWorkspace - open workspace
func (f *FolderController) OpenWorkspace(name string) {
	f.CurrentContent = ""
	f.CurrentPath = ""
	for _, folder := range f.Folder.Folders {
		if folder.Name == name && len(folder.Files) > 0 {
			f.Open(folder.Files[0].Path)
		}
	}
}

// Private Functions

func buildTree(dir string) *models.Folder {
	dir = path.Clean(dir)
	var tree *models.Folder
	var nodes = map[string]interface{}{}
	var walkFun filepath.WalkFunc = func(p string, info os.FileInfo, err error) error {
		if info.IsDir() {
			nodes[p] = &models.Folder{Name: path.Base(p), Files: []*models.File{}, Folders: []*models.Folder{}, Path: p}
		} else {
			if filepath.Ext(p) == ".md" {
				nodes[p] = &models.File{Name: path.Base(p), Path: p}
			}
		}
		return nil
	}
	err := filepath.Walk(dir, walkFun)
	if err != nil {
		log.Fatal(err)
	}

	for key, value := range nodes {
		var parentFolder *models.Folder
		if key == dir {
			tree = value.(*models.Folder)
			continue
		} else {
			parentFolder = nodes[path.Dir(key)].(*models.Folder)
		}

		switch v := value.(type) {
		case *models.File:
			parentFolder.Files = append(parentFolder.Files, v)
		case *models.Folder:
			parentFolder.Folders = append(parentFolder.Folders, v)
		}
	}

	return tree
}
