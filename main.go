package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/darkcl/Notorious/models"
	"github.com/leaanthony/mewn"
	webview "github.com/zserge/webview"
)

func handleRPC(w webview.WebView, data string) {
	switch {
	case strings.HasPrefix(data, "editor.onChange: "):
		fmt.Printf("Recieved Editor changes:\n%s\n", strings.TrimPrefix(data, "editor.onChange: "))
	default:
		panic("Not Implemented")
	}

}

func main() {
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
		ExternalInvokeCallback: handleRPC,
		Debug:                  true,
	})
	defer w.Exit()
	w.Dispatch(func() {
		// Inject controller
		w.Bind("folder", models.NewFolderController(w))
	})
	w.Run()
}
