export class WebSoc {
    constructor() {
        this.socketClosed = true;
        this.upcase = true;
        this.message = ""
        this.error = ""
    }

    attached() {
        var self = this;
        if (window["WebSocket"]) {
            this.conn = new WebSocket("ws://" + window.location.host + "/service/ws");
            this.socketClosed = false;
            this.conn.onclose = function (evt) {
                // hierbinnen geen this
                self.socketClosed = true;
                self.error = "WebSocket: Connection closed";
                try { clearInterval(self.interval); } catch (err) { }
            };
            this.conn.onmessage = function (evt) {
                // hierbinnen geen this
                let messages = evt.data.split('\n');
                if (messages.length > 0) {
                    self.message = messages[messages.length - 1];
                }
            };
            this.interval = setInterval(() => this.update(), 2000);
        } else {
            this.socketClosed = true;
            this.error = "Your browser does not support WebSockets";
        }
    }

    detached() {
        if (this.socketClosed) {
            return
        }
        try { clearInterval(this.interval); } catch (err) { }
        try { this.conn.close(); } catch (err) { }
        this.socketClosed = true;
    }

    update() {
        if (this.socketClosed) {
            return;
        }
        this.upcase = !this.upcase;
        this.conn.send(this.upcase ? "upper" : "lower");
    }

}
