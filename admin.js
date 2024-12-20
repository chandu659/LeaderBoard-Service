import admin from 'firebase-admin';
import serviceAccount from './config/serviceKey.json' assert {type:'json'};

export default admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://real-time-leaderboard-system-default-rtdb.firebaseio.com"
});

