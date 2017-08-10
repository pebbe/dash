'use strict';

var $ = require('jquery');

var twimagelist = {};

/*
 * parameters:
 *   - id
 */
twimagelist.Init = function (v) {
    $.get('https://pebbe001.appspot.com/twimages', function (resp) {
    // returned data will be an XML root element, text string, JavaScript
    // file, or JSON object, depending on the MIME type of the response
        var images;
        if (typeof (resp) == 'string') {
            try {
                images = JSON.parse(resp);
            } catch (e) {
                twimagelist.error(v.id, e);
                return;
            }
        } else {
            images = resp;
        }
        for (var i = 0; i < images.length && i < 20; i++) {
            twimagelist.create(v.id, i, images[i]);
        }
    }).fail(function (e) {
        twimagelist.error(v.id, e);
    });
};

twimagelist.create = function (id, n, image) {
    var o = $('#' + id + ' .template').first().clone();
    o.attr('id', id + '-' + n);
    o.removeClass('template');
    $(o).attr('href', image.link);
    $(o).find('img').attr('src', image.img).attr('width', image.w).attr('height', image.h);
    o.appendTo('#' + id);
};

twimagelist.error = function (id, e) {
    $('<div></div>').addClass('error').text(e.status + ' ' + e.statusText).appendTo('#' + id);
};

window.app = window.app || {};
window.app.twimagelist = twimagelist;
