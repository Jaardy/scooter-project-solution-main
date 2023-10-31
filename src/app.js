const Scooter = require('./Scooter');
const ScooterApp = require('./ScooterApp');
const User = require('./User');

try {
  // Create a new Scooter App and put it through its paces
  const app = new ScooterApp();

  // Add some scooters at some stations
  for (let i = 0; i < 3; i++) {
    app.createScooter('Owings Mills');
  }
  for (let i = 0; i < 5; i++) {
    app.createScooter('West Cold Spring');
  }
  const redScooter = app.createScooter('Johns Hopkins Hospital');

  // Register a user, rent a scooter to that user & return it
  const annie = app.registerUser("Annie", "GoCougs", 19);
  app.loginUser("Annie", "GoCougs");
  app.rentScooter(redScooter, annie);
  app.dockScooter(redScooter, 'Old Court');

  // Display the application state
  app.printState();
} catch(error) {
  console.log(`\nUncaught error: ${error}`);
}