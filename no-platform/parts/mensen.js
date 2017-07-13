'use strict'

var $ = require("jquery");

var mensen = {}

mensen.data = {}

mensen.Init = function (v) {
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

    mensen.data[v.id] = {}
    var data = mensen.data[v.id]

    data.tbody = $('#' + v.id + ' tbody')
    data.input = $('#' + v.id + ' input')
    data.input.on('keyup', function () { mensen.zoeken(v.id) })
    $('#' + v.id + ' .voornaam').on('click', function () { mensen.voornaam(v.id) })
    $('#' + v.id + ' .achternaam').on('click', function () { mensen.achternaam(v.id) })

    data.lijst = [
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
        var order = d['order']
        if (order === 1) {
            mensen.voornaam(v.id)
            reordered = true
        } else if (order === 2) {
            mensen.achternaam(v.id)
            reordered = true
        }
        data.input.val(d['search'] || '')
    }

    if (!reordered) {
        mensen.make(v.id)
    }

    mensen.zoeken(v.id)
}

mensen.make = function (id) {
    var data = mensen.data[id]
    data.tbody.html('')
    for (var i = 0; i < data.lijst.length; i++) {
        data.tbody.append(data.lijst[i].tr)
    }
}

mensen.voornaam = function (id) {
    var data = mensen.data[id]
    data.order = 1
    data.lijst.sort(function (a, b) {
        if (a.voornaam < b.voornaam) {
            return -1
        }
        if (a.voornaam > b.voornaam) {
            return 1
        }
        return 0
    })
    mensen.make(id)
    mensen.save(id)
}

mensen.achternaam = function (id) {
    var data = mensen.data[id]
    data.order = 2
    data.lijst.sort(function (a, b) {
        if (a.achtersort < b.achtersort) {
            return -1
        }
        if (a.achtersort > b.achtersort) {
            return 1
        }
        return 0
    })
    mensen.make(id)
    mensen.save(id)
}

mensen.zoeken = function (id) {
    var data = mensen.data[id]
    data.searchText = data.input.val()
    for (var i = 0; i < data.lijst.length; i++) {
        data.lijst[i].tr.removeClass("nomatch")
        if (!data.lijst[i].matches(data.searchText)) {
            data.lijst[i].tr.addClass("nomatch")
        }
    }
    mensen.save(id)
}

mensen.save = function (id) {
    var data = mensen.data[id]
    localStorage.setItem(
        id,
        JSON.stringify({
            order: data.order,
            search: data.searchText
        }))
}

window.mensen = mensen
