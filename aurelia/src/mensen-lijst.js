import { Mens } from './mens';

export class MensenLijst {
    constructor() {
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
        this.searchText = "";
    }
    orderVoornaam() {
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

