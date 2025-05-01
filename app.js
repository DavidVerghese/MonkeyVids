let apiKey;

function getRandomIndex(videoListLength) {
  return Math.floor(Math.random() * videoListLength)
}

function appendVideo(videoId) {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  const container = document.getElementById('video-container');
  container.appendChild(iframe);
}

async function getVids(searchQuery, maxResults) {

  const backupVideoList = [
    'b0NHrFNZWh0',
    'vOY6x4NksIk',
    'kUG9JdigH54'
  ]

  try {
    const response = await fetch(`http://localhost:3000/videos?searchQuery=${encodeURIComponent(searchQuery)}&maxResults=${maxResults}`);
    const data = await response.json();

    if (response.ok) {
      if (data.items && data.items.length > 0) {
        const randomIndex = getRandomIndex(data.items.length);
        const videoId = data.items[randomIndex].id.videoId;
        appendVideo(videoId);
        return;
      }
    }

    const randomIndex = getRandomIndex(backupVideoList.length)
    const videoId = backupVideoList[randomIndex];
    appendVideo(videoId)

  } catch (error) {
    console.error('Error fetching videos:', error);
  }
}

async function fetchMonkeyVideo() {
  const searchQuery = 'monkey';
  const maxResults = 10; // number of results to pull
  getVids(searchQuery, maxResults);
}

fetchMonkeyVideo();