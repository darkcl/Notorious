package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/darkcl/Notorious/controllers"
	"github.com/darkcl/Notorious/helpers"
	"github.com/leaanthony/mewn"
	webview "github.com/lukevers/webview"
	"github.com/mitchellh/go-homedir"
)

var settingPath string

func handleRPC(w webview.WebView, data string) {
	switch {
	case strings.HasPrefix(data, "editor.onChange: "):
		fmt.Printf("editor.onChange:\n%s\n", strings.TrimPrefix(data, "editor.onChange: "))
	case strings.HasPrefix(data, "openlink: "):
		url := strings.TrimPrefix(data, "openlink: ")
		fmt.Printf("openlink:\n%s\n", url)
		helpers.OpenBrowser(url)
	default:
		panic("Not Implemented")
	}
}

func setupSettings() {
	path, err := homedir.Dir()

	if err != nil {
		panic(err)
	}

	settingPath = filepath.Join(path, ".notorious")

	if _, err := os.Stat(settingPath); os.IsNotExist(err) {
		os.Mkdir(settingPath, os.ModePerm)
	}

	if err != nil {
		panic(err)
	}
}

func setupWorkspace() {
	path, err := homedir.Dir()

	if err != nil {
		panic(err)
	}

	defaultWorkspace := filepath.Join(path, ".notorious", "default")

	if _, err := os.Stat(defaultWorkspace); os.IsNotExist(err) {
		os.Mkdir(defaultWorkspace, os.ModePerm)
	}
}

func main() {
	setupSettings()
	setupWorkspace()

	js := mewn.String("./ui/dist/bundle.min.js")
	indexHTML := mewn.String("./ui/dist/index.html")

	dir, err := ioutil.TempDir("", "notorious")
	if err != nil {
		log.Fatal(err)
		panic(err)
	}
	defer os.RemoveAll(dir)
	tmpIndex := filepath.Join(dir, "index.html")
	if err := ioutil.WriteFile(tmpIndex, []byte(indexHTML), 0666); err != nil {
		log.Fatal(err)
		panic(err)
	}
	abs, err := filepath.Abs(tmpIndex)
	if err != nil {
		log.Fatal(err)
		panic(err)
	}

	tmpJs := filepath.Join(dir, "bundle.min.js")
	if err := ioutil.WriteFile(tmpJs, []byte(js), 0666); err != nil {
		log.Fatal(err)
		panic(err)
	}

	fmt.Printf("Path: %s\n", abs)

	w := webview.New(webview.Settings{
		Title:                  "Notorious",
		URL:                    "file://" + abs,
		Resizable:              true,
		Width:                  1024,
		Height:                 768,
		ExternalInvokeCallback: handleRPC,
		Debug:                  true,
	})
	defer w.Exit()
	w.Dispatch(func() {
		// Inject controller
		w.Bind("folder", controllers.NewFolderController(w))
		w.Bind("settings", controllers.NewSettingsController())
	})
	w.Run()
}
