const User = require('./User');
const Scooter = require('./Scooter');

/*
  The ScooterApp keeps track of all registered users, 
  plus all the scooters and their status. 
  Many ScooterApp methods represent user actions 
  such as logging in or returning a scooter. 
  The ScooterApp uses properties and methods of Scooter and User objects.
*/
class ScooterApp {
  constructor() {
    this.stations = {
      'Owings Mills': [],
      'Old Court' : [],
      'Milford Mill' : [],
      'Reisterstown Plaza' : [],
      'Rogers Avenue' : [],
      'West Cold Spring' : [],
      'Johns Hopkins Hospital' : []
    };
    this.registeredUsers = {}; // { username: user, username: user, ... }
  }

  /*
  If the user is not already registered, and is 18 or older, 
  then add them as a new registered user. 
  Log to the console that the user has been registered. Return the user.
  Otherwise, throw an error: already registered or too young to register
  */
  registerUser(username, password, age) {
    // OK to register user?
    if (age < 18) {
      throw "too young to register";
    } else if (this.registeredUsers[username]) {
      throw "already registered";
    }

    const user = new User(username, password, age);
    this.registeredUsers[username] = user;
    console.log(`user ${username} is registered`);
    return user;
  }

  /*
  Locate the registered user by name and call its login method. 
  Log to the console that the user has been logged in.
  If the user cannot be located, or if the password is incorrect, 
  then throw an error: Username or password is incorrect.
  */
  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (!user) {
      throw "Username or password is incorrect";
    }
    try {
      user.login(password);
      console.log(`user ${username} is logged in`);
    } catch(error) {
      throw "Username or password is incorrect";
    }
  }

  /*
  Locate the registered user and call its logout method. 
  Log user is logged out to the console.
  If the user cannot be located, throw no such user is logged in error
  */
  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (!user || !user.loggedIn) {
      throw "no such user is logged in";
    }

    user.logout();
    console.log(`user ${username} is logged out`);
  }

  /*
  This method is called by the Scooter company’s home office 
  when new scooters are deployed. 
  Create a new scooter, add it to the station’s scooter list, 
  and set its station property. Return the scooter. 
  Throws no such station error if the station does not exist. 
  */
  createScooter(station) {
    if (!this.stations[station]) {
      throw 'no such station';
    }
    const scooter = new Scooter(station);
    this.stations[station].push(scooter);
    scooter.station = station;
    console.log(`created new scooter at ${station}`);
    return scooter;
  }

  /*
  Add the scooter to the station’s scooter list, and dock it. 
  Throws no such station error if the station does not exist. 
  Throws scooter already at station error if the scooter is already there.
  */
  dockScooter(scooter, station) {
    // can we dock this scooter?
    if (!this.stations[station]) {
      throw "no such station";
    }
    if (this.stations[station].includes(scooter)) {
      throw "scooter already at station";
    }

    this.stations[station].push(scooter);
    scooter.dock(station);
    console.log(`scooter is docked at ${station}`);
  }
  
  /*
  Locate the given scooter at one of the stations, and remove it from that 
  station. Rent it to the user. Log scooter removed to the console. 
  If the scooter is already rented, throw the error scooter already rented.
  If the station cannot be located, throw the error no such station.
  */
  rentScooter(scooter, user) {
    // is the scooter at a station?
    if (!scooter.station) {
      throw "scooter already rented";
    } else if (!this.stations[scooter.station]) {
      throw "no such station";
    } 

    // remove scooter from station
    for (let i = 0; i < this.stations[scooter.station].length; i++) {
      if (this.stations[scooter.station][i] === scooter) {
        // TODO handle scooter issues (discharged, broken)
        this.stations[scooter.station].splice(i, "");
        console.log(`scooter from ${scooter.station} is rented to ${user.username}`);
        scooter.station = null;
        scooter.user = user;
        return;
      }
    }

    this.logState();
    throw "scooter not at station";
  }

  /*
  You will use this handy method when testing your ScooterApp.
  Print out the list of registered users.
  Print out the list of stations and how many scooters are at each station.
  Take a moment to format it nicely so you can read it.
  */
  printState() {
    console.log("\n\n*** Scooter Application State ***");
    console.log("\nRegistered Users:");
    Object.keys(this.registeredUsers).map(username => console.log(`   ${username}`));
    console.log("\nStations:");
    for (const station in this.stations) {
      console.log(`  ${station} has ${this.stations[station].length} docked scooters`);
    }
  }
}

module.exports = ScooterApp;