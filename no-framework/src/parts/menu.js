'use strict';

var $ = require('jquery');

var menu = {};

menu.user_id = '';

menu.need_auth = ['user.html'];

/*
 * parameters:
 *   - current
 */
menu.Init = function (v) {
    menu.user_id = localStorage.getItem('user_id') || '';
    menu.setAuth(v);

    $('#nav [href="' + v.current + '"]').parent().addClass('current');

    // eslint-disable-next-line no-unused-vars
    $('#login button').on('click', function (ev) {
        menu.login(v);
    });

    // eslint-disable-next-line no-unused-vars
    $('#logout button').on('click', function (ev) {
        menu.logout(v);
    });
};

menu.login = function (v) {
    menu.user_id = $('#login input').val().trim();
    $('#login input').val('');
    localStorage.setItem('user_id', menu.user_id);
    menu.setAuth(v);
};

menu.logout = function (v) {
    menu.user_id = '';
    localStorage.setItem('user_id', '');
    menu.setAuth(v);
};

menu.setAuth = function (v) {
    if (menu.user_id) {
        $('#login').addClass('hidden');
        $('#logout').removeClass('hidden');
        $('nav div.left').removeClass('hidden');
    } else {
        if (menu.need_auth.indexOf(v.current) >= 0) {
            window.location.replace('.');
            return;
        }
        $('#login').removeClass('hidden');
        $('#logout').addClass('hidden');
        for (var i = 0; i < menu.need_auth.length; i++) {
            $('nav div.left a[href="' + menu.need_auth[i] + '"]').parent().addClass('hidden');
        }
    }
};

window.app = window.app || {};
window.app.menu = menu;
