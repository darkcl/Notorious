package ipc

import (
	"encoding/json"
	"fmt"
	"sync"
	"text/template"

	"github.com/darkcl/webview"
)

// EventCallback - event reciever callback
type EventCallback = func(event string, value interface{}) interface{}

// Main - Main Process IPC
type Main struct {
	w        webview.WebView
	Callback map[string]EventCallback
}

var once sync.Once
var (
	instance *Main
)

// SharedMain - Get Shared IPC Instance
func SharedMain() *Main {
	once.Do(func() {
		instance = &Main{
			Callback: map[string]EventCallback{},
		}
	})

	return instance
}

// SetView -  Set Webview to main
func (m *Main) SetView(view webview.WebView) {
	m.w = view
}

// On - Handle renderer incoming messagin
func (m *Main) On(event string, cb EventCallback) {
	m.Callback[event] = cb
}

// Send - Send a message to renderer
func (m *Main) Send(event string, value interface{}) {
	fmt.Println("Send Event")
	jsonString, err := json.Marshal(value)

	if err != nil {
		fmt.Printf("Error on sending value: %v\n", err)
		return
	}

	jsString := fmt.Sprintf(`window.renderer.trigger("%s", "%s")`, event, template.JSEscapeString(string(jsonString)))
	m.w.Eval(jsString)
}

// Trigger - Trigger from renderer
func (m *Main) Trigger(message Message) {
	fmt.Println("Receive Event")

	if cb, ok := m.Callback[message.Event]; ok {
		cb(message.Event, message.Value)
	} else {
		fmt.Println("Callback not found")
	}
}
