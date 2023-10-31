/*
This class represents the individual scooters that users 
will rent from stations. A Scooter is either docked at a 
Station or checked out to a User. 
Scooters can also be broken or need charging.
*/
class Scooter {
  // Start as 0 so that the first scooter instance will have a value of 1.
  static nextSerial = 0;

  constructor(station) {
    // Scooter is docked at the station
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }

  /*
  If the Scooter is charged above 20% and not broken, 
  remove it from its station, check it out to user. 
  Otherwise, throw an error scooter needs to charge or 
  scooter needs repair.
  */
  rent(user) {
    // is scooter rentable?
    if (this.isBroken) {
      throw "scooter needs repair";
    } else if (this.charge < 20) {
      throw "scooter needs to charge";
    }

    // rent the scooter
    this.user = user;
    this.station = null;
  }

  /*
  Return the scooter to the station. Be sure to clear out 
  the user, so they don’t get charged unfairly!
  */
  dock(station) {
    this.station = station;
    this.user = null;
  }

  /*
  BONUS: Set a timer to incrementally update the 
  Scooter’s charge to 100. 
  Every so often, log the new percentage of charge.
  */
  recharge() {
    this.charge = 100;
  }

  /*
  BONUS: Use a setInterval timer to schedule a repair in 
  5 seconds. When time elapses, set isBroken to false and 
  log repair completed to the console
  */
  requestRepair() {
    this.isBroken = false;
  }
};

module.exports = Scooter;