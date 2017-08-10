export class UserService {
  username = ''
  auth = false
  constructor() {
    this.load();
  }
  save(name) {
    name = name.trim();
    this.username = name;
    localStorage.setItem('user_id', name);
    this.update();
  }
  load() {
    this.username = localStorage.getItem('user_id') || '';
    this.update();
  }
  update() {
    this.auth = Boolean(this.username);
  }
}
