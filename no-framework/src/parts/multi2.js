'use strict';

var $ = require('jquery');

var multi2 = {};

/*
 * parameters:
 *   - id
 *   - message
 */
multi2.Init = function (v) {
    $('#' + v.id).text(v.message + ' (~(with box)~)');
};

window.app = window.app || {};
window.app.multi2 = multi2;
