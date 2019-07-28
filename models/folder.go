package models

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/lukevers/webview"
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

func (f *Folder) Read() {
	dir := f.webView.Dialog(webview.DialogTypeOpen, webview.DialogFlagDirectory, "Open directory", "")
	err := filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		fmt.Println(path, info.Size())
		return nil
	})

	if err != nil {
		log.Fatal(err)
		panic(err)
	}
}
