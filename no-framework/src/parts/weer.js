'use strict';

var $ = require('jquery');

var weer = {};

/*
 * parameters:
 *   - id
 */
weer.Init = function (v) {
    $.get('http://www.let.rug.nl/kleiweg/bin/cdf.sh', function (resp) {
        // returned data will be an XML root element, text string, JavaScript
        // file, or JSON object, depending on the MIME type of the response
        var data;
        if (typeof (resp) == 'string') {
            try {
                data = JSON.parse(resp);
            } catch (e) {
                weer.error(v.id, e);
                return;
            }
        } else {
            data = resp;
        }
        var names = data.variables.stationname.values;
        var idx = 0;
        var patt = /groningen/i;
        for (idx = 0; idx < names.length; idx++) {
            if (patt.test(names[idx])) {
                break;
            }
        }
        if (idx == names.length) {
            weer.error(v.id, '~(weather station not found)~');
            return;
        }
        $('#' + v.id + ' .plaats').text('~(The weather in)~ ' + names[idx]);
        var t1 = data.variables.tn.values[idx];
        var t2 = data.variables.tx.values[idx];
        if (t1 > -300 && t2 > -300) {
            $('#' + v.id + ' .temp').text(((t1 + t2) / 2).toFixed(1) + '°C');
        } else {
            $('#' + v.id + ' .temp').text('??°C');
        }
        var date = new Date(1000 * (data.variables.time.values[0] - 631152000));
        $('#' + v.id + ' .tijd').text(date);
    }).fail(function (e) {
        weer.error(v.id, e);
    });
};

weer.error = function (id, err) {
    $('#' + id + ' plaats').text(err);
};

window.app = window.app || {};
window.app.weer = weer;
