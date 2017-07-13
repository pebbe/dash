package main

import (
	"github.com/pebbe/util"

	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

var (
	basedir = ".."

	x = util.CheckErr
)

func main() {

	x(os.RemoveAll(filepath.Join(basedir, "work")))
	for _, dirname := range []string{"style", "html", "script"} {
		x(os.MkdirAll(filepath.Join(basedir, "work", dirname), 0777))
	}

	fp, err := os.Create(filepath.Join(basedir, "work", "script", "script.src.js"))
	x(err)
	for _, dirname := range []string{"pages", "parts"} {
		p := filepath.Join(basedir, dirname)
		fis, err := ioutil.ReadDir(p)
		x(err)
		for _, fi := range fis {
			filename := fi.Name()
			if strings.HasSuffix(filename, ".js") {
				base := filename[:len(filename)-3]
				fmt.Fprintf(fp, "var %s = require(\"%s\")\n", base, filepath.Join("..", "..", dirname, base))
			}
		}
	}
	fp.Close()
}
