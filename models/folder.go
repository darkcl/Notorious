package models

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/zserge/webview"
)

// Folder - Describe current folder structure
type Folder struct {
	Name    string   `json:"name"`
	Folders []Folder `json:"folders"`
	Files   []string `json:"files"`

	webView webview.WebView
}

// NewFolderController - Create New Folder Controller
func NewFolderController(webView webview.WebView) *Folder {
	return &Folder{
		webView: webView,
	}
}

func visit(files *[]string) filepath.WalkFunc {
	return func(path string, info os.FileInfo, err error) error {
		if err != nil {
			log.Fatal(err)
		}
		*files = append(*files, path)
		return nil
	}
}

func (f *Folder) Read() {
	files := f.webView.Dialog(webview.DialogTypeOpen, webview.DialogFlagDirectory, "Open directory", "")
	fmt.Printf("Selected Folder: %s\n", files)
}
