export class WebSoc {
    constructor() {
        this.socketClosed = true;
        this.upcase = true;
        this.message = ""
        this.error = ""

        var self = this;

        if (window["WebSocket"]) {
            this.conn = new WebSocket("ws://" + window.location.host + "/ws");
            this.socketClosed = false;
            this.conn.onclose = function (evt) {
                self.socketClosed = true;
                self.error = "WebSocket: Connection closed";
            };
            this.conn.onmessage = function (evt) {
                var messages = evt.data.split('\n');
                if (messages.length > 0) {
                    self.message = messages[messages.length - 1];
                }
            };
        } else {
            this.socketClosed = true;
            this.error = "Your browser does not support WebSockets";
        }

        this.interval = setInterval(() => this.update(), 2000);
    }

    detached() {
        if (!this.socketClosed) {
            clearInterval(this.interval);
            this.conn.close();
            this.socketClosed = true;
        }
    }

    update() {
        if (this.socketClosed) {
            return;
        }
        this.upcase = !this.upcase;
        this.conn.send(this.upcase ? "upper" : "lower");
    }

}
