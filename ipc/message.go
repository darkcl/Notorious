package ipc

// Message - IPC Message
type Message struct {
	Event string      `json:"evt"`
	Value interface{} `json:"val"`
}
