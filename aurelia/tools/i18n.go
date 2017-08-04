package main

import (
	"fmt"

	"github.com/pebbe/util"

	"encoding/json"
	"io/ioutil"
	"os"
	"regexp"
	"sort"
)

var (
	re = regexp.MustCompile(`~\(.*?\)~`)
	x  = util.CheckErr
)

func main() {
	b, err := ioutil.ReadAll(os.Stdin)
	x(err)

	var v map[string]string
	x(json.Unmarshal(b, &v))
	ss := make([]string, 0)
	seen := make(map[string]bool)
	for _, filename := range os.Args[1:] {
		b, err := ioutil.ReadFile(filename)
		x(err)
		for _, m := range re.FindAllString(string(b), -1) {
			m = m[2 : len(m)-2]
			if !seen[m] && m != "LANG" {
				seen[m] = true
				ss = append(ss, m)
			}
		}
	}
	sort.Strings(ss)
	fmt.Printf("{\n%q:%q", "LANG", v["LANG"])
	for _, s := range ss {
		fmt.Printf(",\n%q: %q", s, v[s])
		if v[s] == "" {
			fmt.Fprintln(os.Stderr, "MISSING:", s)
		}
	}
	fmt.Println("\n}")
}
