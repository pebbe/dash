import { HttpClient } from 'aurelia-http-client';

export class Twimages {
  constructor() {
    this.twimages = [];
    this.error = '';
    let client = new HttpClient();
    client.get('https://pebbe001.appspot.com/twimages')
      .then(data => {
        this.twimages = JSON.parse(data.response);
        if (this.twimages.length > 20) {
          this.twimages.length = 20;
        }
      })
      .catch(err => {
        this.error = '~(ERROR)~: ' + err.statusCode + ' ' + err.statusText;
      });
  }
}
