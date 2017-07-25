'use strict'

var $ = require("jquery");

var objectlist = {}

/*
 * parameters:
 *   - id
 */
objectlist.Init = function (v) {
    objectlist.create(v.id, 1, "_(Alpha)_", "_(Bravo)_", "_(Charlie)_")
    objectlist.create(v.id, 2, "_(red)_", "_(green)_", "_(blue)_")
    objectlist.create(v.id, 3, "abc", "pqr", "xyz")
}

objectlist.create = function  (id, n, c1, c2, c3) {
    var o = $('#' + id + " .template").first().clone()
    o.attr("id", id + "-" + n)
    o.removeClass("template")
    $(o).find(".n").text(n)
    $(o).find(".col1").text(c1)
    $(o).find(".col2").text(c2)
    $(o).find(".col3").text(c3)
    o.appendTo("#" + id)
}

window.app = window.app || {}
window.app.objectlist = objectlist
