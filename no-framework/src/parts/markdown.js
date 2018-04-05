'use strict';

var $ = require('jquery');
var MarkdownIt = require('markdown-it');

var md = {};

/*
 * parameters:
 *   - id
 *   - data
 */
md.Init = function (v) {
    $.ajax({
        url: v.data
    }).done(function (data) {
        // console.log(data);  // eslint-disable-line no-console
        var d = $('#' + v.id + '>div');
        var mdi = new MarkdownIt();
        var result = mdi.render(data);
        d.html(result);
    });
};

window.app = window.app || {};
window.app.markdown = md;
