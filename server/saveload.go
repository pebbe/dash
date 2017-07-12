package main

import (
	"io/ioutil"
	"net/http"
)

var (
	text string
)

func save(w http.ResponseWriter, r *http.Request) {
	b, err := ioutil.ReadAll(r.Body)
	r.Body.Close()
	if err == nil {
		text = string(b)
		w.Write([]byte("saved: " + text))
	} else {
		w.Write([]byte(err.Error()))
	}
}

func load(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte(text))
}
