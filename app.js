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

async function getApiKey() {
  const response = await fetch('http://localhost:3000/apikey');
  const data = await response.json();
  return data.apiKey;
}

async function getRandomMonkeyVideo(searchQuery, maxResults, apiKey) {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(searchQuery)}&type=video&key=${apiKey}`);
    const data = await response.json();
    
    const backupVideoList = [
      'b0NHrFNZWh0',
      'vOY6x4NksIk',
      'kUG9JdigH54'
    ]

    if (response.ok) {
      if (data.items && data.items.length > 0) {
        const randomIndex = getRandomIndex(data.items.length);
        const videoId = data.items[randomIndex].id.videoId;
        appendVideo(videoId);
      } else {
        console.error('No videos found.');
      }
    } else {
      const randomIndex = getRandomIndex(backupVideoList.length)
      const videoId = backupVideoList[randomIndex];
      appendVideo(videoId)
    }
  } catch (error) {
    console.error('Error fetching video:', error);
  }
}

async function fetchMonkeyVideo() {
  try {
    apiKey = await getApiKey();
    const searchQuery = 'monkey';
    const maxResults = 10; // number of results to pull

    getRandomMonkeyVideo(searchQuery, maxResults, apiKey);
  } catch {
    // 
  }

}

fetchMonkeyVideo();