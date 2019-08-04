package models

// Folder - Describe current folder structure
type Folder struct {
	Name    string    `json:"name"`
	Files   []*File   `json:"files"`
	Folders []*Folder `json:"folders"`
	Path    string    `json:"path"`
}

// File - Describe current file info
type File struct {
	Name string `json:"name"`
	Path string `json:"path"`
}
