package models

// Folder - Describe current folder structure
type Folder struct {
	Name    string             `json:"name"`
	Files   []*File            `json:"files"`
	Folders map[string]*Folder `json:"folders"`
}

// File - Describe current file info
type File struct {
	Name string `json:"name"`
}
