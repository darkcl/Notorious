package controllers

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path"
	"path/filepath"

	"github.com/darkcl/Notorious/models"
	"github.com/lukevers/webview"
)

// FolderController - Folder Controller
type FolderController struct {
	Folder         *models.Folder `json:"folderTree"`
	CurrentContent string         `json:"currentContent,omitempty"`
	CurrentPath    string
	webView        webview.WebView
}

// NewFolderController - Create New Folder Controller
func NewFolderController(webView webview.WebView) *FolderController {
	return &FolderController{
		webView: webView,
	}
}

// Read - Open folder picker and read as file tree
func (f *FolderController) Read() {
	dir := f.webView.Dialog(webview.DialogTypeOpen, webview.DialogFlagDirectory, "Open directory", "")
	f.Folder = f.buildTree(dir)
}

// Clear - clear current folder tree
func (f *FolderController) Clear() {
	f.Folder = nil
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

func (f *FolderController) buildTree(dir string) *models.Folder {
	dir = path.Clean(dir)
	var tree *models.Folder
	var nodes = map[string]interface{}{}
	var walkFun filepath.WalkFunc = func(p string, info os.FileInfo, err error) error {
		if info.IsDir() {
			nodes[p] = &models.Folder{Name: path.Base(p), Files: []*models.File{}, Folders: map[string]*models.Folder{}, Path: p}
		} else {
			nodes[p] = &models.File{Name: path.Base(p), Path: p}
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
			parentFolder.Folders[v.Name] = v
		}
	}

	return tree
}
