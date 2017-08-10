export class Mens {
  constructor(voornaam, achternaam, achtersort) {
    this.voornaam = voornaam;
    this.achternaam = achternaam;
    this.achtersort = achtersort || achternaam;
  }
  matches(substring) {
    let s = substring.toLowerCase();
    return this.voornaam.toLowerCase().includes(s) ||
            this.achternaam.toLowerCase().includes(s);
  }
}
