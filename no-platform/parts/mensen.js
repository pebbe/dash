'use strict'

var $ = require("jquery");

window.mensen = {}
window.mensen.Init = function (v) {
    function Mens(voornaam, achternaam, achtersort) {
        this.voornaam = voornaam
        this.achternaam = achternaam
        this.achtersort = achtersort || achternaam
        this.tr = $('<tr>')
            .append($('<td>').text(voornaam))
            .append($('<td>').text(achternaam))
        this.matches = function (substring) {
            var s = substring.toLowerCase()
            return this.voornaam.toLowerCase().includes(s) ||
                this.achternaam.toLowerCase().includes(s)
        }
    }

    window.mensen.data = window.mensen['data'] || {}
    window.mensen.data[v.id] = {}
    var data = window.mensen.data[v.id]

    $('#' + v.id + ' .voornaam').on('click', function () { window.mensen.voornaam(v.id) })
    $('#' + v.id + ' .achternaam').on('click', function () { window.mensen.achternaam(v.id) })
    data.input = $('#' + v.id + ' input')
    data.input.on('keyup', function () { window.mensen.zoeken(v.id) })
    data.tbody = $('#' + v.id + ' tbody')

    data.mensen = [
        new Mens('Chris', 'Froome'),
        new Mens('Richie', 'Porte'),
        new Mens('Alberto', 'Contador'),
        new Mens('Romain', 'Bardet'),
        new Mens('Nairo', 'Quintana'),
        new Mens('Michal', 'Kwiatkowski'),
        new Mens('Alejandro', 'Valverde'),
        new Mens('John', 'Degenkolb'),
        new Mens('Bauke', 'Mollema'),
        new Mens('Laurens', 'ten Dam', 'Dam'),
        new Mens('Greg', 'Van Avermaet'),
        new Mens('Fabio', 'Aru'),
        new Mens('Peter', 'Sagan')
    ]

    data.order = 0
    data.searchText = ''

    var reordered = false
    var storageContent = localStorage.getItem(v.id)
    if (storageContent !== undefined) {
        var d = JSON.parse(storageContent) || {}
        var order = +d['order'] || 0
        if (order === 1) {
            window.mensen.voornaam(v.id)
            reordered = true
        } else if (order === 2) {
            window.mensen.achternaam(v.id)
            reordered = true
        }
        data.input.val(d['search'] || '')
    }

    if (!reordered) {
        window.mensen.make(v.id)
    }

    window.mensen.zoeken(v.id)
}

window.mensen.make = function (id) {
    var data = window.mensen.data[id]
    data.tbody.html('')
    for (var i = 0; i < data.mensen.length; i++) {
        data.tbody.append(data.mensen[i].tr)
    }
}

window.mensen.voornaam = function (id) {
    var data = window.mensen.data[id]
    data.order = 1
    //data.save()                                                                                               
    data.mensen.sort(function (a, b) {
        if (a.voornaam < b.voornaam) {
            return -1
        }
        if (a.voornaam > b.voornaam) {
            return 1
        }
        return 0
    })
    window.mensen.make(id)
    window.mensen.save(id)
}

window.mensen.achternaam = function (id) {
    var data = window.mensen.data[id]
    data.order = 2
    //data.save()                                                                                               
    data.mensen.sort(function (a, b) {
        if (a.achtersort < b.achtersort) {
            return -1
        }
        if (a.achtersort > b.achtersort) {
            return 1
        }
        return 0
    })
    window.mensen.make(id)
    window.mensen.save(id)
}

window.mensen.zoeken = function (id) {
    var data = window.mensen.data[id]
    data.searchText = data.input.val()
    for (var i = 0; i < data.mensen.length; i++) {
        data.mensen[i].tr.removeClass("nomatch")
        if (!data.mensen[i].matches(data.searchText)) {
            data.mensen[i].tr.addClass("nomatch")
        }
    }
    window.mensen.save(id)
}

window.mensen.save = function (id) {
    var data = window.mensen.data[id]
    localStorage.setItem(
        id,
        JSON.stringify({
            order: data.order,
            search: data.searchText
        }))
}

