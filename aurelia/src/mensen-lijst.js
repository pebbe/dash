import { bindable, inject, ObserverLocator } from 'aurelia-framework';
import { Mens } from "./mens";

@inject(ObserverLocator)
export class MensenLijst {
    @bindable hideStyle;
    @bindable idTag;
    constructor(observerLocator) {
        this.mensen = [
            new Mens("Chris", "Froome"),
            new Mens("Richie", "Porte"),
            new Mens("Alberto", "Contador"),
            new Mens("Romain", "Bardet"),
            new Mens("Nairo", "Quintana"),
            new Mens("Michal", "Kwiatkowski"),
            new Mens("Alejandro", "Valverde"),
            new Mens("John", "Degenkolb"),
            new Mens("Bauke", "Mollema"),
            new Mens("Laurens", "ten Dam", "Dam"),
            new Mens("Greg", "Van Avermaet"),
            new Mens("Fabio", "Aru"),
            new Mens("Peter", "Sagan")
        ];
        this.order = 0;
        this.searchText = "";
        this.subscription = observerLocator
            .getObserver(this, 'searchText')
            .subscribe(this.save.bind(this));
    }
    attached() {
        this.load();
    }
    load() {
        let storageContent = localStorage.getItem("MensenLijst" + this.idTag);
        if (storageContent == undefined) { return; }
        let data = JSON.parse(storageContent);
        this.order = data["order"] || 0;
        this.searchText = data["search"] || "";
        if (this.order == 1) {
            this.orderVoornaam();
        } else if (this.order == 2) {
            this.orderAchternaam();
        }
    }
    save() {
        localStorage.setItem(
            "MensenLijst" + this.idTag,
            JSON.stringify({
                order: this.order,
                search: this.searchText
            }));
    }
    orderVoornaam() {
        this.order = 1;
        this.save();
        this.mensen.sort(function (a, b) {
            if (a.voornaam < b.voornaam) {
                return -1;
            }
            if (a.voornaam > b.voornaam) {
                return 1
            }
            return 0;
        });
    }
    orderAchternaam() {
        this.order = 2;
        this.save();
        this.mensen.sort(function (a, b) {
            if (a.achtersort < b.achtersort) {
                return -1;
            }
            if (a.achtersort > b.achtersort) {
                return 1
            }
            return 0;
        });
    }
}

