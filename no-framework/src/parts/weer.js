'use strict';

var $ = require('jquery');

var weer = {};

/*
 * parameters:
 *   - id
 */
weer.Init = function (v) {
    $.get('/~kleiweg/cgi-bin/meteo/cdf.sh', function (resp) {
        // returned data will be an XML root element, text string, JavaScript
        // file, or JSON object, depending on the MIME type of the response

        if (typeof (resp) == 'string') {
            weer.error(v.id, '~(Error)~', resp);
            return;
        }

        if (!(resp.variables && resp.variables.stationname)) {
            weer.error(v.id, '~(failed to parse JSON object)~');
            return;
        }
        var vars = resp.variables;
        var names = vars.stationname.values;
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
        var t1 = vars.tn.values[idx];
        var t2 = vars.tx.values[idx];
        if (t1 > -300 && t2 > -300) {
            $('#' + v.id + ' .temp').text(((t1 + t2) / 2).toFixed(1) + '°C');
        } else {
            $('#' + v.id + ' .temp').text('??°C');
        }
        var date = new Date(1000 * (vars.time.values[0] - 631152000));
        $('#' + v.id + ' .tijd').text(date);
    }).fail(function (resp) {
        if (resp.status == 200) {
            weer.error(v.id, '~(invalid response)~', resp.responseText);
        } else {
            weer.error(v.id, resp.status + ' ' + resp.statusText);
        }
    });
};

weer.error = function (id, err, msg) {
    $('#' + id + ' .plaats').text(err);
    $('#' + id + ' .tijd').text(msg);
};

window.app = window.app || {};
window.app.weer = weer;
