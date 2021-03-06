'use strict';

var $ = require('jquery');

var saveload = {};

saveload.data = {};

/*
 * parameters:
 *   - id
 */
saveload.Init = function (v) {

    // eslint-disable-next-line no-unused-vars
    $('#' + v.id + ' .save').on('click', function (ev) {
        saveload.save(v.id);
    });

    // eslint-disable-next-line no-unused-vars
    $('#' + v.id + ' .load').on('click', function (ev) {
        saveload.load(v.id);
    });

    saveload.data[v.id] = {};
    var data = saveload.data[v.id];
    data.text = $('#' + v.id + ' input');
    data.output = $('#' + v.id + ' .loaded');
};

saveload.save = function (id) {
    var data = saveload.data[id];
    var text = data.text.val();
    data.text.val('');
    data.output.text('');
    $.post('../bin/save.~(LANG)~', text, function (resp) {
        data.output.text(resp);
    }).fail(function (e) {
        data.output.text(e['status'] + ' ' + e['statusText']);
    });
};

saveload.load = function (id) {
    var data = saveload.data[id];
    data.output.text('');
    $.get('../bin/load', function (resp) {
        data.output.text(resp);
    }).fail(function (e) {
        data.output.text(e['status'] + ' ' + e['statusText']);
    });
};

window.app = window.app || {};
window.app.saveload = saveload;
