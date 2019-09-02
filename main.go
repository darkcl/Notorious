package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	"github.com/darkcl/Notorious/controllers"
	"github.com/darkcl/Notorious/helpers"
	"github.com/darkcl/Notorious/ipc"
	webview "github.com/darkcl/webview"
	"github.com/leaanthony/mewn"
	"github.com/mitchellh/go-homedir"
)

var settingPath string

func handleRPC(w webview.WebView, data string) {
	var message ipc.Message
	err := json.Unmarshal([]byte(data), &message)

	if err != nil {
		fmt.Printf("Error on handle rpc data: %v\n", err)
		return
	}

	ipcMain := ipc.SharedMain()
	ipcMain.Trigger(message)
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

	settings := controllers.NewSettingsController()
	folder := controllers.NewFolderController(w)

	if settings.Settings.LastOpenFile != "" && settings.Settings.LastOpenWorkspace != "" {
		folder.Open(filepath.Join(settingPath, settings.Settings.LastOpenWorkspace, settings.Settings.LastOpenFile))
	}

	ipcMain := ipc.SharedMain()
	ipcMain.SetView(w)
	ipcMain.On(
		"openlink",
		func(event string, value interface{}) interface{} {
			url := value.(string)
			helpers.OpenBrowser(url)
			return nil
		})

	ipcMain.On(
		"code-exec-request",
		func(event string, value interface{}) interface{} {
			jsonString := value.(string)
			controller := controllers.NewCodeExecutionController()
			controller.ParseAndExecute(jsonString)
			return nil
		})

	w.Dispatch(func() {
		// Inject controller
		w.Bind("folder", folder)
		w.Bind("settings", settings)
	})
	w.Run()
}
