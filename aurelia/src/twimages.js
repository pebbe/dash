import { HttpClient } from 'aurelia-http-client';

export class Twimages {
  constructor() {
    this.twimages = []
    this.error = ''
    let client = new HttpClient();
    client.get('https://pebbe001.appspot.com/twimages')
      .then(data => {
        console.log(data)
        this.twimages = JSON.parse(data.response)
        console.log(this.twimages)
      })
      .catch(err => {
        this.error = "~(ERROR)~: " + err['statusText']
      })
  }
}
