'use strict'

var $ = require("jquery");

var tweetlist = {}

/*
 * parameters:
 *   - id
 */
tweetlist.Init = function (v) {
  $.get('static/tweets.json', function (resp) {
    var tweets
    try {
      tweets = JSON.parse(resp)
    } catch (e) {
      tweets = resp
    }
    for (var i = 0; i < tweets.length && i < 20; i++) {
      tweetlist.create(v.id, i, tweets[i])
    }
  }).fail(function (e) {
    tweetlist.error(v.id, e)
  })
}

tweetlist.create = function (id, n, tweet) {
  var o = $('#' + id + " .template").first().clone()
  o.attr("id", id + "-" + n)
  o.removeClass("template")

  if (tweet.retweeted_status.text) {
    tweet = tweet.retweeted_status
  }

  $(o).find(".ico").attr("src", tweet.user.profile_image_url)
  $(o).find(".text").attr("href", "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str)
  $(o).find(".name").text(tweet.user.name)
  $(o).find(".text").text(tweet.text)
  o.appendTo("#" + id + " table")
}

tweetlist.error = function (id, e) {
  var o = $('#' + id + " .template").first().clone()
  o.removeClass("template")
  $(o).find(".name").text("ERROR")
  $(o).find(".text").text(e.status + " " + e.statusText)
  o.appendTo("#" + id + " table")
}

window.tweetlist = tweetlist
