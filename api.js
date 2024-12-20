import express from 'express';
import bodyParser from 'body-parser'; 
import cors from 'cors';
import admin from './admin.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = admin.database();

// Add user to competition
app.post('/add-user', async (req, res) => {
    const { competitionId, userId, userName } = req.body;
    try {
        await db.ref(`competitions/${competitionId}/users/${userId}`).set({
            name: userName,
            score: 0
        });
        res.status(200).send('User added successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update score
app.post('/update-score', async (req, res) => {
    const { competitionId, userId, score } = req.body;
    try {
        await db.ref(`competitions/${competitionId}/users/${userId}`).update({
            score
        });
        res.status(200).send('Score updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get leaderboard
app.get('/leaderboard/:competitionId', async (req, res) => {
    const { competitionId } = req.params;
    try {
        const snapshot = await db.ref(`competitions/${competitionId}/users`).orderByChild('score').once('value');
        const leaderboard = [];
        console.log("test Leaderboard route:", leaderboard);
        snapshot.forEach(userSnapshot => {
            leaderboard.push({
                userId: userSnapshot.key,
                ...userSnapshot.val()
            });
        });
        leaderboard.reverse(); 
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/home', async (req, res) =>{
    res.status(200).send('Welcome to the home page'); 
});

app.listen(5000, () => console.log('Server is running on port 5000'));
