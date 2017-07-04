package main

import (
	"github.com/pebbe/util"

	"io/ioutil"
	"log"
	"net/http"
	"path"
	"strings"
)

const (
	port = ":8444"
)

var (
	x = util.CheckErr
)

func main() {
	http.HandleFunc("/", handle)

	x(http.ListenAndServe(port, nil))

}

func handle(w http.ResponseWriter, r *http.Request) {
	log.Println(r.RemoteAddr, r.URL)

	url := path.Clean("/" + r.URL.Path)[1:]

	if strings.HasPrefix(url, "static/") {
		static(w, url)
		return
	}

	switch url {
	case "":
		static(w, "static/index.html")
	case "favicon.ico":
		static(w, "static/favicon.ico")
	default:
		http.Error(w, "Not found", http.StatusNotFound)
	}
}

func static(w http.ResponseWriter, url string) {
	data, err := ioutil.ReadFile("../" + url)
	if err != nil {
		http.Error(w, "Not found", http.StatusNotFound)
		return
	}

	switch path.Ext(url) {
	case ".html":
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
	case ".txt":
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	case ".js":
		w.Header().Set("Content-Type", "application/javascript")
	case ".css":
		w.Header().Set("Content-Type", "text/css")
	case ".ico":
		w.Header().Set("Content-Type", "image/x-icon")
	}
	w.Write(data)
}
