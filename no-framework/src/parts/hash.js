'use strict';

var $ = require('jquery');

var hash = {};

hash.data = {
    current: '',
};

/*
 * parameters:
 *   - id
 *   - hashes
 */
hash.Init = function (v) {
    var ul = $('#' + v.id + ' ul');
    for (var i = 0; i < v.hashes.length; i++) {
        var h = v.hashes[i];
        ul.append('<li><a href="javascript:app.hash.goto(\'' + h + '\')")>~(Go to)~ ' + h + '</li>');
    }
    if (location.hash.replace('#', '') == v.id) {
        $('#' + v.id + ' ul').addClass('hashed');
        hash.data.current = v.id;
    }
};

hash.goto = function (id) {
    if (hash.data.current) {
        $('#' + hash.data.current + ' ul').removeClass('hashed');
    }
    $('#' + id + ' ul').addClass('hashed');
    hash.data.current = id;
    location.hash = id;
};

window.app = window.app || {};
window.app.hash = hash;
