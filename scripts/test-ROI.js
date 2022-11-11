// Test File blah blah blah you know the drill

// tests MetEireann
const MetEireann = require("../lib/MetEireann.js");

// Print out the current alerts for the ROI
// Needs to be in a function to use await
async function test() {
    const alerts = await MetEireann.getAlerts(); // Met Eireann doesn't have a region code
    console.log(alerts);
}

// Run the test
test();