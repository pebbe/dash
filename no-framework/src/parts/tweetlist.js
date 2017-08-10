'use strict';

var $ = require('jquery');

var tweetlist = {};

/*
 * parameters:
 *   - id
 */
tweetlist.Init = function (v) {
    $.get('https://pebbe001.appspot.com/tweets', function (resp) {
    // returned data will be an XML root element, text string, JavaScript
    // file, or JSON object, depending on the MIME type of the response
        var tweets;
        if (typeof (resp) == 'string') {
            try {
                tweets = JSON.parse(resp);
            } catch (e) {
                tweetlist.error(v.id, e);
                return;
            }
        } else {
            tweets = resp;
        }
        for (var i = 0; i < tweets.length && i < 20; i++) {
            tweetlist.create(v.id, i, tweets[i]);
        }
    }).fail(function (e) {
        tweetlist.error(v.id, e);
    });
};

tweetlist.create = function (id, n, tweet) {
    var o = $('#' + id + ' .template').first().clone();
    o.attr('id', id + '-' + n);
    o.removeClass('template');

    if (tweet.retweeted_status.text) {
        tweet = tweet.retweeted_status;
    }

    $(o).find('.ico').attr('src', tweet.user.profile_image_url);
    $(o).find('.text').attr('href', 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str);
    $(o).find('.name').text(tweet.user.name);
    $(o).find('.text').text(tweet.text);
    o.appendTo('#' + id + ' table');
};

tweetlist.error = function (id, e) {
    var o = $('#' + id + ' .template').first().clone();
    o.removeClass('template');
    $(o).find('.name').text('ERROR');
    $(o).find('.text').text(e.status + ' ' + e.statusText);
    o.appendTo('#' + id + ' table');
};

window.app = window.app || {};
window.app.tweetlist = tweetlist;
