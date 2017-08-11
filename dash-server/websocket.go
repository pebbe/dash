package main

import (
	"github.com/gorilla/websocket"
	"github.com/pebbe/util"

	"log"
	"net/http"
	"strings"
	"time"
)

type msg struct {
	mt      int
	message []byte
}

var (
	warn     = util.WarnErr
	words    = []string{"aap", "noot", "mies", "wim", "zus", "jet"}
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool { return true },
	}
)

func ws(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if warn(err) != nil {
		return
	}
	defer c.Close()

	chQuit := make(chan bool)
	go func() {
		time.Sleep(60 * time.Second)
		close(chQuit)
	}()

	ch := make(chan msg, 1)
	go func() {
		for {
			mt, message, err := c.ReadMessage()
			if warn(err) != nil {
				return
			}
			// fmt.Println("read", mt, string(message))
			select {
			case <-chQuit:
				log.Printf("reader quit")
				return
			case ch <- msg{mt, message}:
			default:
			}
		}
	}()

	var m msg
	var ticker <-chan time.Time
	upper := false
	j := 0
	for {
		select {
		case <-chQuit:
			log.Printf("writer quit")
			return
		case m = <-ch:
			upper = string(m.message) == "upper"
			if ticker == nil {
				ticker = time.Tick(600 * time.Millisecond)
			}
		case <-ticker:
			// can't send anything until m.mt is known
			w := words[j]
			if upper {
				w = strings.ToUpper(w)
			}
			err = c.WriteMessage(m.mt, []byte(w))
			if warn(err) != nil {
				break
			}
			// fmt.Println("write", m.mt, w)
			j++
			if j == len(words) {
				j = 0
			}
		}
	}
}
