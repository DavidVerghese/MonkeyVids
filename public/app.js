let apiKey;

function getRandomIndex(videoListLength) {
  return Math.floor(Math.random() * videoListLength)
}

let videoIndex = 0;

function appendVideo(videoId) {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  const container = document.getElementById('video-container');
  container.appendChild(iframe);
}

function appendSelectedVideo(videoIds, videoIndex = 0) {
  const container = document.getElementById('video-container');
  container.innerHTML = '';

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoIds[videoIndex]}`;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  container.appendChild(iframe);
}

const backupVideoList = [
  'rWH4XGO1KSU',
  'REPoVfN-Ij4',
  'FiHrUpnkfZk',
  'Tbp9AyitsJ8',
  'rVrUhlW0HQo',
  'sN-Hj73ES2U',
  'yqzVI0CSKCU',
  '7nPrlNvSlNk',
  'yARtExKaIH8',
  'vWWXx5XGAUE',
  '3sq7lojhlWk'
]

async function getVids(searchQuery, maxResults, channelId) {

  try {
    const response = await fetch(`http://localhost:3000/videos?searchQuery=${encodeURIComponent(searchQuery)}&maxResults=${maxResults}&channelId=${channelId}`);
    const data = await response.json();

    if (response.ok) {
      if (data.items && data.items.length > 0) {
        const randomIndex = getRandomIndex(data.items.length);
        const videoId = data.items[randomIndex].id.videoId;
        appendVideo(videoId);
        return;
      }
    }

    appendSelectedVideo(backupVideoList);

  } catch (error) {
    console.error('Error fetching videos:', error);
  }
}

async function fetchMonkeyVideo() {
  const searchQuery = 'monkey';
  const maxResults = 10; // number of results to pull
  const channelId = 'UCpVm7bg6pXKo1Pr6k5kxG9A' // nationalGeographic
  getVids(searchQuery, maxResults, channelId);
}

const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', () => {
  videoIndex < 10 ? videoIndex++ : videoIndex = 0;
  appendSelectedVideo(backupVideoList, videoIndex);
})

fetchMonkeyVideo();