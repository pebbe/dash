'use strict';

var $ = require('jquery');

var slots = {};

/*
 * parameters:
 *   - id
 *   - slots
 */
slots.Init = function (v) {
    for (var i = 0; i < v.slots.length; i++) {
        var dst = $('#' + v.id + ' .' + v.slots[i][0]);
        var src = $(v.slots[i][1]);
        dst.html(src.html());
        src.remove();
    }
    $('#' + v.id + '>div>div').removeClass('hidden');
};

window.app = window.app || {};
window.app.slots = slots;
