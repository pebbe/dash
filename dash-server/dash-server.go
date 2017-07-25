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
	cache  bool
)

func usage() {
	fmt.Printf(`
Usage: %s au|nf|nf.dev

`, os.Args[0])
}

func main() {
	if len(os.Args) != 2 {
		usage()
		return
	}

	switch os.Args[1] {
	case "au":
		prefix = "../aurelia/dist"
	case "nf":
		prefix = "../no-framework/dist"
		cache = true
	case "nf.dev":
		prefix = "../no-framework/devel"
	default:
		usage()
		return
	}

	http.HandleFunc("/", handle)
	x(http.ListenAndServe(port, nil))
}

func handle(w http.ResponseWriter, r *http.Request) {

	log.Println(r.RemoteAddr, r.URL.Path)

	url := path.Clean("/" + r.URL.Path)[1:]

	if !strings.HasPrefix(url, "service/") && !strings.HasPrefix(url, "bin/") {
		static(w, url)
		return
	}

	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Add("Pragma", "no-cache")
	switch url {
	case "service/up":
		up(w, r)
	case "service/ws":
		ws(w, r)
	case "service/save", "bin/save":
		save(w, r)
	case "service/load", "bin/load":
		load(w, r)
	default:
		http.Error(w, "Not found", http.StatusNotFound)
		log.Println("NOT FOUND:", url)
	}
}

func static(w http.ResponseWriter, url string) {

	if cache {
		w.Header().Set("Cache-Control", "public, max-age=86400")
	}

	filename := path.Join(prefix, url)
	fi, err := os.Stat(filename)

	if err != nil {
		http.Error(w, "Not found", http.StatusNotFound)
		log.Println("NOT FOUND:", url)
		return
	}
	if fi.IsDir() {
		filename = path.Join(filename, "index.html")
	}
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		http.Error(w, "Not found", http.StatusNotFound)
		log.Println("NOT FOUND:", url)
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

func up(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Write([]byte("dash\n"))
}