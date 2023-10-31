/*
When a new person downloads the app and registers, 
a new User object is created to store user information 
in the system. (In a real world scenario, this object 
would also store credit card information, rental history, etc.)
*/
class User {
  constructor(username, password, age) {
    this.username = username;
    this.password = password;
    this.age = age;
    this.loggedIn = false;
  }

  /*
  If password is correct, logs the user in. 
  If not, throws incorrect password error.
  */
  login(password) {
    if (password != this.password) {
      throw "incorrect password";
    };

    this.loggedIn = true;
  }

  /*
  Logs the user out.
  */
  logout() {
    this.loggedIn = false;
  }
};

module.exports = User;