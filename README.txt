TENDENCIAS DE YOUTUBE
Proyecto para obtener y mostrar vídeos en tendencia de YouTube según el país seleccionado, usando la YouTube Data API v3.

📋 Requisitos
Clave de API de YouTube Data v3 (API_KEY)

🛠️ Estructura de archivos

/index.html
/youtubeTt.js
/styles.css


🔧 Configuración
En youtubeTt.js:

const API_KEY     = '';       // Clave API de YouTube
const MAX_RESULTS = 12;       // Número de vídeos a mostrar


🚀 Flujo
Inicialización

window.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('seleccionar-pais');
  getTrending(select.value);
});
Al cargar la página, muestra tendencias del país seleccionado por defecto.

Cambio de país

document.getElementById('seleccionar-pais').addEventListener('change', function(e) {
  getTrending(e.target.value);
});
Al seleccionar un país distinto, actualiza automáticamente las tendencias.

getTrending(region)

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
Obtiene los videos en tendencia según el código de país seleccionado.

renderVideos(videos)

function renderVideos(videos) {
  const container = document.getElementById('video-card');
  container.innerHTML = '';
  videos.forEach(v => {
    const thumb   = v.snippet.thumbnails.medium.url;
    const title   = v.snippet.title;
    const channel = v.snippet.channelTitle;
    const views   = Number(v.statistics.viewCount).toLocaleString();

    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
      <img src="${thumb}" alt="Miniatura de ${title}" />
      <div class="video-info">
        <h3>${title}</h3>
        <p>Canal: ${channel}</p>
        <p>Vistas: ${views}</p>
      </div>
    `;
    container.appendChild(card);
  });
}
Muestra las tarjetas de vídeo de forma visual y adaptativa.

📚 Documentación
YouTube Data API v3 (oficial) https://developers.google.com/youtube/v3/docs?hl=es-419

