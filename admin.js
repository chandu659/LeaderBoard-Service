const admin = require('firebase-admin');

const serviceAccount = require('./serviceKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://real-time-leaderboard-system-default-rtdb.firebaseio.com"
});



