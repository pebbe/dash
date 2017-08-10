'use strict';

var $ = require('jquery');

var userpage = {};

/*
 * parameters: geen
 */
userpage.Init = function () {
    $('.userpage h1').text('~(Hello)~, ' + localStorage.getItem('user_id') || '');
};

window.app = window.app || {};
window.app.userpage = userpage;
