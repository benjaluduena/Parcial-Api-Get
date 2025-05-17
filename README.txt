
# TENDENCIAS DE YOUTUBE (ARG)

Proyecto sencillo para obtener y mostrar vídeos en tendencia de YouTube usando la YouTube Data API v3.

## 📋 Requisitos

* Clave de API de YouTube Data v3 (`API_KEY`)

## 🛠️ Estructura de archivos

```
/index.html
/youtubeTt.js
/styles.css
```

## 🔧 Configuración

En `youtubeTt.js`:


const API_KEY     = 'TU_API_KEY';   // tu clave YouTube Data API v3
const REGION      = 'AR';           // código ISO de región
const MAX_RESULTS = 12;             // nº de vídeos que trae


## 🚀 Flujo 

1. **Inicialización**

   ```js
   window.addEventListener('DOMContentLoaded', getTrending);
   ```

   * Ejecuta `getTrending()` al cargar el DOM.

2. **getTrending()**

   ```js
   async function getTrending() {
     const url = new URL('https://www.googleapis.com/youtube/v3/videos');
     url.search = new URLSearchParams({
       part: 'snippet,statistics',
       chart: 'mostPopular',
       regionCode: REGION,
       maxResults: MAX_RESULTS,
       key: API_KEY
     });

     try {
       const res = await fetch(url);
       if (!res.ok) throw new Error(res.statusText);
       const { items } = await res.json();
       renderVideos(items);
     } catch (err) {
       document.getElementById('video-container').innerHTML =
         `<p>Error al cargar los vídeos: ${err.message}</p>`;
     }
   }
   ```

   * Construye la URL con los parámetros necesarios.
   * Realiza la petición GET.
   * Maneja respuesta y errores.

3. **renderVideos(videos)**

   ```js
   function renderVideos(videos) {
     const container = document.getElementById('video-container');
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
   ```

   * Limpia el contenedor y crea tarjetas de vídeo.
   * Formatea vistas con separadores de miles.

DOCUMENTACION QUE USE : 
https://developers.google.com/youtube/v3/docs?hl=es-419

