window.onload = () => {
    updateHistoryUI();
    if (localStorage.getItem('theme') === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }
};

const inputs = [document.getElementById('songInput'), document.getElementById('artistInput')];
inputs.forEach(el => {
    el.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') getPhi();
    });
});

function toggleTheme() {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme');
    const target = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', target);
    localStorage.setItem('theme', target);
}

async function getPhi() {
    const song = document.getElementById('songInput').value;
    const artist = document.getElementById('artistInput').value;
    
    if (!song) return;

    const loader = document.getElementById('loader');
    const result = document.getElementById('result-display');
    
    loader.style.display = 'block';
    result.style.display = 'none';

    try {
        const query = encodeURIComponent(`${song} ${artist}`);
        const response = await fetch(`/api/calculate?song=${query}`);
        
        if (!response.ok) throw new Error('Search failed');
        
        const data = await response.json();
        console.log("Phi calculation successful for:", data.name);

        loader.style.display = 'none';
        result.style.display = 'block';
        
        document.getElementById('timestamp').innerText = data.phiMoment;
        document.getElementById('guideTime').innerText = data.phiMoment;
        document.getElementById('track-meta').innerText = `${data.name} — ${data.artist}`;
        
        document.getElementById('player-wrap').innerHTML = `
            <a href="https://open.spotify.com/track/$${data.trackId}" target="_blank" class="app-link">Open in Spotify App</a>
            <iframe src="https://open.spotify.com/embed/track/$${data.trackId}?utm_source=generator" 
                width="100%" height="352" frameborder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                style="border-radius:12px; margin-top:20px; border: none;"></iframe>`;
        
        storeHistory(data.name, data.phiMoment);
    } catch (err) {
        loader.style.display = 'none';
        console.error(err);
        alert("Couldn't find that track. Check your spelling and try again.");
    }
}

function storeHistory(name, time) {
    let history = JSON.parse(localStorage.getItem('phiPeaks')) || [];
    history.unshift({name, time});
    history = history.slice(0, 5);
    localStorage.setItem('phiPeaks', JSON.stringify(history));
    updateHistoryUI();
}

function updateHistoryUI() {
    const list = document.getElementById('history-list');
    const history = JSON.parse(localStorage.getItem('phiPeaks')) || [];
    list.innerHTML = history.map(item => `
        <li class="history-item">
            <span>${item.name}</span>
            <span class="gold">${item.time}</span>
        </li>`).join('');
}
