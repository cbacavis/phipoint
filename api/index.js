const express = require('express');
const axios = require('axios');
const app = express();

// These names must match what you type into Vercel's settings later
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

app.get('/api/calculate', async (req, res) => {
    const songName = req.query.song;
    try {
        // 1. Ask Spotify for permission (Token)
        const tokenRes = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
            headers: {
                'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        // 2. Search for the song
        const searchRes = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(songName)}&type=track&limit=1`, {
            headers: { 'Authorization': `Bearer ${tokenRes.data.access_token}` }
        });

        const track = searchRes.data.tracks.items[0];
        if (!track) return res.status(404).json({ error: "Song not found" });

        // 3. The Phi Calculation
        const phiMs = track.duration_ms * 0.618;
        const totalSec = Math.floor(phiMs / 1000);
        const timestamp = `${Math.floor(totalSec / 60)}:${(totalSec % 60).toString().padStart(2, '0')}`;

        res.json({ name: track.name, artist: track.artists[0].name, phiMoment: timestamp });
    } catch (err) {
        res.status(500).json({ error: "Check your Spotify Keys in Vercel Settings" });
    }
});
const path = require('path');
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});
module.exports = app;
