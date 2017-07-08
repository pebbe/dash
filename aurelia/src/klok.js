export class Klok {
    constructor() {
        this.update();
        setInterval(() => this.update(), 1000);
    }
    update() {
        let d = new Date();
        let sec = d.getSeconds() + (d.getMilliseconds() > 500 ? 1 : 0);
        let min = d.getMinutes() + sec / 60;
        let uur = d.getHours() + min / 60;
        uur = uur / 12 * 6.2831853;
        min = min / 60 * 6.2831853;
        sec = sec / 60 * 6.2831853
        this.uurX = Math.sin(uur);
        this.uurY = Math.cos(uur);
        this.minX = Math.sin(min);
        this.minY = Math.cos(min);
        this.secX = Math.sin(sec);
        this.secY = Math.cos(sec);
    }
}
