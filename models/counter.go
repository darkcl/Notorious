package models

// Counter - Simple Go-to-JS data binding
type Counter struct {
	Value int `json:"value"`
}

// Add increases the value of a counter by n
func (c *Counter) Add(n int) {
	c.Value = c.Value + int(n)
}

// Reset sets the value of a counter back to zero
func (c *Counter) Reset() {
	c.Value = 0
}
