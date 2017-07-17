'use strict'

var $ = require("jquery");

var objectlist = {}
objectlist.Init = function (v) {
    objectlist.create(v.id, 1, "aap", "noot", "mies")
    objectlist.create(v.id, 2, "rood", "groen", "blauw")
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

window.objectlist = objectlist
