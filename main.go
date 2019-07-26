package main

import (
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	"github.com/darkcl/Notorious/models"
	"github.com/leaanthony/mewn"
	"github.com/zserge/webview"
)

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

	w := webview.New(webview.Settings{
		Title: "Notorious",
		URL:   "file://" + abs,
	})
	defer w.Exit()
	w.Dispatch(func() {
		// Inject controller
		w.Bind("counter", &models.Counter{})
	})
	w.Run()
}
