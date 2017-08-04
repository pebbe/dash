import { HttpClient } from 'aurelia-http-client';

export class SaveLoad {
    constructor() {
        this.text = ""
        this.loaded = ""
    }
    load() {
        let client = new HttpClient();
        client.get('../bin/load')
            .then(data => {
                this.loaded = data.response
            })
            .catch(err => {
                this.loaded = "~(ERROR)~: " + err['statusText']
            })
    }
    save() {
        let client = new HttpClient();
        client.post('../bin/save', this.text)
            .then(data => {
                this.loaded = data.response
                this.text = ''
            })
            .catch(err => {
                this.loaded = "~(ERROR)~: " + err['statusText']
                this.text = ''
            })
    }
}
