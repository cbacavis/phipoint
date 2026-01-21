# PhiPoint
### Identifying the "Golden Ratio" of Song Structure

**PhiPoint** is a tool born from a simple question: *Does the mathematical "perfect" point of a song align with its emotional or structural peak?* Using the Golden Ratio (phi ≈ 1.618), this application calculates the precise timestamp where a track reaches its "Phi point." By leveraging the **Spotify Web API**, the app fetches song duration data and returns the exact moment where the mathematical peak occurs, allowing listeners to explore the relationship between math and music.

---

## Why I Built This
Coming from a background in English literature and rhetoric, I’ve always been fascinated by structure—how a story or a poem builds tension and where that tension breaks. When I began learning **JavaScript and Node.js**, I wanted to apply that same analytical lens to music. 

This project served as my introduction to:
* **API Integration:** Navigating the Spotify Web API’s OAuth flow and endpoint structures.
* **Asynchronous Logic:** Handling real-time data fetching and processing.
* **Deployment:** Moving a local concept into a live, functional web environment via Vercel.

---

## How It Works
The logic is straightforward but precise. The application:
1. **Authenticates** with the Spotify API to gain access to their track catalog.
2. **Retrieves** the total duration of a specific track in milliseconds.
3. **Calculates** the Phi Point using the inverse of the Golden Ratio: 
   $T_{peak} = \text{Duration} \times 0.618$
4. **Converts** the resulting milliseconds into a user-friendly `minutes:seconds` format.

---

## Technical Stack
* **Language:** JavaScript (Node.js)
* **Framework/Environment:** Built for modern browsers and server-side execution.
* **API:** Spotify Web API (Web Player & Tracks endpoints).
* **Deployment:** Vercel.

---

## Getting Started
If you’d like to run this locally, you will need your own Spotify Developer credentials.

1. Clone the repository.
2. Create a `.env` file and add your `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`.
3. Install dependencies: `npm install`
4. Run the application: `npm start`

---

## Current Status & Future Ideas
The core calculator is functional. Moving forward, I am interested in expanding this to:
* Visualizing the track’s waveform alongside the PhiPoint.
* Cross-referencing the mathematical peak with "loudness" data provided by Spotify's audio analysis.
* Creating a "PhiPoint" playlist generator based on user favorites.

---

### Author
**CHRIS BACAVIS** *High School English Teacher | Emerging Developer | Colorado Springs, CO*
