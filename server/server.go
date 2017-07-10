package main

import (
	"fmt"
	"path"

	"github.com/pebbe/util"

	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
)

const (
	port = ":11000"
)

var (
	x      = util.CheckErr
	prefix string
	isAu   bool
	isVue  bool
	isNuxt bool
)

func usage() {
	fmt.Printf(`
Usage: %s au|vue|nuxt

`, os.Args[0])
}

func main() {
	if len(os.Args) != 2 {
		usage()
		return
	}

	switch os.Args[1] {
	case "au":
		isAu = true
		prefix = "aurelia"
	case "vue":
		isVue = true
		prefix = "vue"
	case "nuxt":
		isNuxt = true
		prefix = "nuxt/dist"
	default:
		usage()
		return
	}

	http.HandleFunc("/", handle)
	x(http.ListenAndServe(port, nil))
}

func handle(w http.ResponseWriter, r *http.Request) {
	log.Println(r.RemoteAddr, r.URL)

	url := path.Clean("/" + r.URL.Path)[1:]

	if !strings.HasPrefix(url, "service/") {
		static(w, url)
		return
	}

	switch url {
	case "service/ws":
		ws(w, r)
	default:
		http.Error(w, "Not found", http.StatusNotFound)
	}
}

func static(w http.ResponseWriter, url string) {
	filename := path.Join("..", prefix, url)
	fi, err := os.Stat(filename)
	if err != nil {
		http.Error(w, "Not found", http.StatusNotFound)
		return
	}
	if fi.IsDir() {
		filename = path.Join(filename, "index.html")
	}
	data, err := ioutil.ReadFile(filename)
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
	case ".json":
		w.Header().Set("Content-Type", "application/json")
	case ".map":
		w.Header().Set("Content-Type", "application/json")
	case ".css":
		w.Header().Set("Content-Type", "text/css")
	case ".gif":
		w.Header().Set("Content-Type", "image/gif")
	case ".png":
		w.Header().Set("Content-Type", "image/png")
	case ".jpg":
		w.Header().Set("Content-Type", "image/jpeg")
	case ".ico":
		w.Header().Set("Content-Type", "image/x-icon")
	}

	w.Write(data)
}
