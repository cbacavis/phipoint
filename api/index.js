const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

// 1. Serves the "Face" of the app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// 2. The Calculation Logic
app.get('/api/calculate', async (req, res) => {
    const songName = req.query.song;
    try {
        // Request Access Token
        const tokenRes = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
            headers: {
                'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        // Search for the track
        const searchRes = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(songName)}&type=track&limit=1`, {
            headers: { 'Authorization': `Bearer ${tokenRes.data.access_token}` }
        });

        const track = searchRes.data.tracks.items[0];
        if (!track) return res.status(404).json({ error: "Song not found" });

        // Calculate the Phi Moment (0.618)
        const phiMs = track.duration_ms * 0.618;
        const totalSec = Math.floor(phiMs / 1000);
        const timestamp = `${Math.floor(totalSec / 60)}:${(totalSec % 60).toString().padStart(2, '0')}`;

        // Send all data back to the frontend, including the ID for the player
        res.json({ 
            name: track.name, 
            artist: track.artists[0].name, 
            phiMoment: timestamp,
            trackId: track.id // This is what the player uses
        });
    } catch (err) {
        res.status(500).json({ error: "Check your Spotify Keys in Vercel Settings" });
    }
});

module.exports = app;
