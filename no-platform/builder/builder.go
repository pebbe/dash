package main

import (
	"github.com/pebbe/util"

	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

var (
	rePart = regexp.MustCompile(`<!--\[\[([a-zA-Z0-9]+)(\s*)(.*?)\]\]-->`)
	reVar  = regexp.MustCompile(`{{[a-zA-Z0-9]+}}`)

	basedir string

	x = util.CheckErr

	jsfiles = make(map[string]bool)
)

func main() {

	basedir = os.Args[1]

	fp, err := os.Create(filepath.Join(basedir, "work", "script.src.js"))
	x(err)
	for _, dirname := range []string{"pages", "parts"} {
		p := filepath.Join(basedir, dirname)
		fis, err := ioutil.ReadDir(p)
		x(err)
		for _, fi := range fis {
			filename := fi.Name()
			if strings.HasSuffix(filename, ".js") {
				base := filename[:len(filename)-3]
				jsfiles[base] = true
				fmt.Fprintf(fp, "var %s = require(\"%s\")\n", base, filepath.Join(p, base))
			}
		}
	}
	fp.Close()

	p := filepath.Join(basedir, "pages")
	fis, err := ioutil.ReadDir(p)
	x(err)
	for _, fi := range fis {
		name := fi.Name()
		if strings.HasSuffix(name, ".html") {
			doPage(name[:len(name)-5])
		}
	}
}

func doPage(page string) {
	filename := filepath.Join(basedir, "pages", page+".html")
	b, err := ioutil.ReadFile(filename)
	x(err)
	html := string(b)

	pagefiles := make([][2]string, 0)

	mm := rePart.FindAllStringSubmatch(html, -1)
	if mm != nil {
		for _, m := range mm {
			if jsfiles[m[1]] {
				pagefiles = append(pagefiles, [2]string{m[1], m[3]})
			}
		}
	}

	var buffer bytes.Buffer
	for _, v := range pagefiles {
		fmt.Fprintf(&buffer, "%s.Init(%s);\n", v[0], v[1])
	}
	i := strings.LastIndex(html, "</body>")
	html = html[:i] + `
<script src="script.js"></script>
<script>
` + buffer.String() + `</script>
` + html[i:]

	html = rePart.ReplaceAllStringFunc(html, doPart)

	fp, err := os.Create(filepath.Join(basedir, "dist", page+".html"))
	x(err)
	fp.Write([]byte(html))
	fp.Close()
}

func doPart(s string) string {
	m := rePart.FindStringSubmatch(s)

	translate := make(map[string]string)
	if m[3] != "" {
		var v map[string]interface{}
		x(json.Unmarshal([]byte(m[3]), &v))
		for key, val := range v {
			translate[key] = fmt.Sprint(val)
		}
	}

	filename := filepath.Join(basedir, "parts", m[1]+".html")
	b, err := ioutil.ReadFile(filename)
	x(err)

	html := strings.TrimSpace(string(b))

	html = reVar.ReplaceAllStringFunc(html,
		func(s string) string {
			return translate[s[2:len(s)-2]]
		})

	return html
}
