'use strict';

var $ = require('jquery');

var multi = {};

/*
 * parameters:
 *   - id
 *   - message
 */
multi.Init = function (v) {
    $('#' + v.id).text(v.message + ' (~(without box)~)');
};

window.app = window.app || {};
window.app.multi = multi;
