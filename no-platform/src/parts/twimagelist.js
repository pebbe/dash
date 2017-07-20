'use strict'

var $ = require("jquery");

var twimagelist = {}

/*
 * parameters:
 *   - id
 */
twimagelist.Init = function (v) {
  $.get('static/twimages.json', function (resp) {
    var images = JSON.parse(resp)
    for (var i = 0; i < images.length && i < 20; i++) {
      twimagelist.create(v.id, i, images[i])
    }
  }).fail(function (e) {
    twimagelist.error(v.id, e)
  })
}

twimagelist.create = function (id, n, image) {
  var o = $('#' + id + " .template").first().clone()
  o.attr("id", id + "-" + n)
  o.removeClass("template")
  $(o).attr("href", image.link)
  $(o).find("img").attr("src", image.img)
  o.appendTo("#" + id)
}

twimagelist.error = function (id, e) {
  var err = document.createElement("div");
  $(err).addClass("error").text(e.status + " " + e.statusText).appendTo("#" + id)
}

window.twimagelist = twimagelist
