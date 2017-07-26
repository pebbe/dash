package main

import (
	"github.com/pebbe/util"

	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path"
	"regexp"
	"sort"
	"strconv"
	"strings"
)

const (
	port = ":11000"
)

type LangType struct {
	language string
	score    float64
}

type LangTypes []LangType

var (
	x      = util.CheckErr
	prefix string
	cache  bool
	reLang = regexp.MustCompile(`^[a-zA-Z]+`)
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
		static(w, r, url)
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

func static(w http.ResponseWriter, r *http.Request, url string) {

	if cache {
		w.Header().Set("Cache-Control", "public, max-age=86400")
	}

	filetype := path.Ext(url)

	filename := path.Join(prefix, url)
	fi, err := os.Stat(filename)
	if err == nil && fi.IsDir() {
		if !strings.HasSuffix(r.URL.Path, "/") {
			http.Redirect(w, r, r.URL.Path+"/", http.StatusMovedPermanently)
			return
		}
		filename = path.Join(filename, "index.html")
		filetype = ".html"
	}

	var data []byte
	for _, ex := range ext(r) {
		data, err = ioutil.ReadFile(filename + ex)
		if err == nil {
			break
		}
	}
	if err != nil {
		http.Error(w, "Not found", http.StatusNotFound)
		log.Println("NOT FOUND:", url)
		return
	}

	switch filetype {
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

func ext(r *http.Request) []string {
	accs := r.Header.Get("Accept-Language")
	if accs == "" {
		return []string{""}
	}

	langs := make([]LangType, 0)
	seen := make(map[string]bool)

	for _, acc := range strings.Split(accs, ",") {
		al := strings.Split(acc, ";")

		al[0] = strings.TrimSpace(al[0])
		lang := "." + reLang.FindString(al[0])
		if lang == "." {
			continue
		}
		if seen[lang] {
			continue
		}
		if len(al) != 2 {
			langs = append(langs, LangType{lang, 1})
			seen[lang] = true
			continue
		}
		q := strings.Split(al[1], "=")
		if len(q) == 2 && strings.TrimSpace(q[0]) == "q" {
			f, err := strconv.ParseFloat(q[1], 64)
			if err == nil {
				langs = append(langs, LangType{lang, f})
				seen[lang] = true
			}
		}
	}

	sort.Stable(LangTypes(langs))

	ss := make([]string, len(langs)+1)
	for i, l := range langs {
		ss[i+1] = l.language
	}
	return ss
}

func (a LangTypes) Len() int {
	return len(a)
}

func (a LangTypes) Swap(i, j int) {
	a[i], a[j] = a[j], a[i]
}

func (a LangTypes) Less(i, j int) bool {
	// van groot naar klein
	return a[j].score < a[i].score
}
