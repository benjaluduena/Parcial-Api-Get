const API_KEY = 'AIzaSyDeCGQcKvQJFL6g1re7Eclr8Y1EXiY8r0E'; // No me la roben  
const MAX_RESULTS = 12;

async function getTrending(region = 'AR') {
  const url = new URL('https://www.googleapis.com/youtube/v3/videos');
  url.search = new URLSearchParams({
    part: 'snippet,statistics',
    chart: 'mostPopular',
    regionCode: region,
    maxResults: MAX_RESULTS,
    key: API_KEY
  });
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    const { items } = await res.json();
    renderVideos(items);
  } catch (err) {
    document.getElementById('video-card')
      .innerHTML = `<p>Error al cargar los vídeos: ${err.message}</p>`;
  }
}

function renderVideos(videos) {
  const container = document.getElementById('video-card');
  container.innerHTML = '';
  videos.forEach(v => {
    const thumb = v.snippet.thumbnails.medium.url;
    const title = v.snippet.title;
    const channel = v.snippet.channelTitle;
    const views = Number(v.statistics.viewCount).toLocaleString();
    const link = `https://www.youtube.com/watch?v=${v.id}`;

    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
      <img src="${thumb}" alt="Miniatura de ${title}">
      <div class="video-info">
        <h3>${title}</h3>
        <p>Canal: ${channel}</p>
        <p>Vistas: ${views}</p>
        <a href="${link}" target="_blank">Ver en YouTube</a>
      </div>
    `;
    container.appendChild(card);
  });
}

// Escuchar cambios en el select de regiones
document.getElementById('seleccionar-pais').addEventListener('change', function(e) {
  getTrending(e.target.value);
});

