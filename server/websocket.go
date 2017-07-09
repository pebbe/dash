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
	upgrader = websocket.Upgrader{} // use default options
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
				break
			}
			select {
			case <-chQuit:
				log.Printf("quit")
				return
			case ch <- msg{mt, message}:
			default:
			}

		}
	}()

	var m msg
	select {
	case <-chQuit:
		log.Printf("quit")
		return
	case m = <-ch:
	}
	upper := string(m.message) == "upper"
	j := 0
	for {
		select {
		case <-chQuit:
			log.Printf("quit")
			return
		case m = <-ch:
			upper = string(m.message) == "upper"
		default:
		}
		w := words[j]
		if upper {
			w = strings.ToUpper(w)
		}
		err = c.WriteMessage(m.mt, []byte(w))
		if warn(err) != nil {
			break
		}
		j++
		if j == len(words) {
			j = 0
		}
		time.Sleep(600 * time.Millisecond)
	}
}
