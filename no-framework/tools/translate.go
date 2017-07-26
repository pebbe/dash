package main

import (
	"github.com/pebbe/util"

	"encoding/json"
	"io/ioutil"
	"os"
	"regexp"
)

var (
	re = regexp.MustCompile(`~\(.*?\)~`)
	x  = util.CheckErr
)

func main() {
	b, err := ioutil.ReadFile(os.Args[1])
	x(err)
	var v map[string]string
	x(json.Unmarshal(b, &v))

	b, err = ioutil.ReadAll(os.Stdin)
	x(err)
	s := re.ReplaceAllStringFunc(
		string(b),
		func(s string) string {
			s1 := s[2 : len(s)-2]
			if t := v[s1]; t != "" {
				return t
			}
			return s1
		})

	os.Stdout.Write([]byte(s))
}
