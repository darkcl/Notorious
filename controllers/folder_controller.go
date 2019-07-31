package controllers

import (
	"log"
	"os"
	"path"
	"path/filepath"

	"github.com/darkcl/Notorious/models"
	"github.com/lukevers/webview"
)

// FolderController - Folder Controller
type FolderController struct {
	Folder  *models.Folder `json:"folderTree"`
	webView webview.WebView
}

// NewFolderController - Create New Folder Controller
func NewFolderController(webView webview.WebView) *FolderController {
	return &FolderController{
		webView: webView,
	}
}

func (f *FolderController) Read() {
	dir := f.webView.Dialog(webview.DialogTypeOpen, webview.DialogFlagDirectory, "Open directory", "")
	f.Folder = f.buildTree(dir)
}

func (f *FolderController) buildTree(dir string) *models.Folder {
	dir = path.Clean(dir)
	var tree *models.Folder
	var nodes = map[string]interface{}{}
	var walkFun filepath.WalkFunc = func(p string, info os.FileInfo, err error) error {
		if info.IsDir() {
			nodes[p] = &models.Folder{Name: path.Base(p), Files: []*models.File{}, Folders: map[string]*models.Folder{}}
		} else {
			nodes[p] = &models.File{Name: path.Base(p)}
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
