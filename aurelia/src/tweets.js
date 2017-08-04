import { HttpClient } from 'aurelia-http-client';

export class Tweets {
  constructor() {
    this.tweets = []
    this.error = ''
    let client = new HttpClient();
    client.get('https://pebbe001.appspot.com/tweets')
      .then(data => {
        this.tweets = JSON.parse(data.response)
        for (var i = 0; i < this.tweets.length; i++) {
          if (this.tweets[i].retweeted_status && this.tweets[i].retweeted_status.text) {
            this.tweets[i] = this.tweets[i].retweeted_status
          }
          this.tweets[i].url = 'https://twitter.com/' +
            this.tweets[i].user.screen_name + '/status/' +
            this.tweets[i].id_str
        }
      })
      .catch(err => {
        this.error = "~(ERROR)~: " + err['statusCode'] + ' ' + err['statusText']
      })
  }
}
