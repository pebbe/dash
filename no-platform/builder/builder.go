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
	rePart = regexp.MustCompile(`<!--\[\[([-_a-zA-Z0-9]+)(\s*)(.*?)\]\]-->`)
	reVar  = regexp.MustCompile(`{{[-_a-zA-Z0-9]+}}`)

	basedir string

	x = util.CheckErr

	jsfiles = make(map[string]bool)
	globals = make(map[string]string)
)

func main() {

	basedir = os.Args[1]

	fp, err := os.Create(filepath.Join(basedir, "devel", "script.js.in"))
	x(err)

	p := filepath.Join(basedir, "src", "globals")
	fis, err := ioutil.ReadDir(p)
	x(err)
	for _, fi := range fis {
		filename := fi.Name()
		if strings.HasSuffix(filename, ".js") {
			base := filename[:len(filename)-3]
			fmt.Fprintf(fp, "var Global__%s = require(\"%s\")\n", base, filepath.Join(p, base))
		}
	}

	for _, dirname := range []string{"pages", "parts"} {
		p := filepath.Join(basedir, "src", dirname)
		fis, err := ioutil.ReadDir(p)
		x(err)
		for _, fi := range fis {
			filename := fi.Name()
			if strings.HasSuffix(filename, ".js") {
				base := filename[:len(filename)-3]
				if !jsfiles[base] {
					jsfiles[base] = true
					fmt.Fprintf(fp, "var %s = require(\"%s\")\n", base, filepath.Join(p, base))
				}
			}
		}
	}
	fp.Close()

	p = filepath.Join(basedir, "src", "globals", "settings.json")
	b, err := ioutil.ReadFile(p)
	x(err)
	var v map[string]interface{}
	x(json.Unmarshal(b, &v))
	for key, val := range v {
		globals[key] = fmt.Sprint(val)
	}

	p = filepath.Join(basedir, "src", "pages")
	fis, err = ioutil.ReadDir(p)
	x(err)
	for _, fi := range fis {
		name := fi.Name()
		if strings.HasSuffix(name, ".html") {
			doPage(name[:len(name)-5])
		}
	}
}

func doPage(page string) {
	filename := filepath.Join(basedir, "src", "pages", page+".html")
	b, err := ioutil.ReadFile(filename)
	x(err)
	html := string(b)

	html = reVar.ReplaceAllStringFunc(html,
		func(s string) string {
			return globals[s[2:len(s)-2]]
		})

	pagefiles := make([][2]string, 0)

	for {
		mm := rePart.FindAllStringSubmatch(html, -1)
		if mm == nil || len(mm) == 0 {
			break
		}
		for _, m := range mm {
			if jsfiles[m[1]] {
				pagefiles = append(pagefiles, [2]string{m[1], m[3]})
			}
		}
		html = rePart.ReplaceAllStringFunc(html, doPart)
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

	fp, err := os.Create(filepath.Join(basedir, "devel", page+".html"))
	x(err)
	fp.Write([]byte(html))
	fp.Close()
}

func doPart(s string) string {
	m := rePart.FindStringSubmatch(s)

	translate := make(map[string]string)
	for key, value := range globals {
		translate[key] = value
	}
	if m[3] != "" {
		var v map[string]interface{}
		x(json.Unmarshal([]byte(m[3]), &v))
		for key, val := range v {
			translate[key] = fmt.Sprint(val)
		}
	}

	filename := filepath.Join(basedir, "src", "parts", m[1]+".html")
	b, err := ioutil.ReadFile(filename)
	x(err)

	html := strings.TrimSpace(string(b))

	html = reVar.ReplaceAllStringFunc(html,
		func(s string) string {
			return translate[s[2:len(s)-2]]
		})

	return "<!-- begin " + m[1] + " -->\n" + html + "\n<!-- end " + m[1] + " -->\n"
}
