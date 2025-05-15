let videoIndex = 0;

function appendVideo(videoId) {
  const container = document.getElementById('video-container');
  container.innerHTML = '';

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
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

async function getVids(searchQuery, maxResults, channelId, pageToken = '') {
  try {
    const pageTokenParameter = pageToken ? `&pageToken=${pageToken}` : ''
    const response = await fetch(`/videos?searchQuery=${encodeURIComponent(searchQuery)}&maxResults=${maxResults}&channelId=${channelId}${pageTokenParameter}`);
    const data = await response.json();

    if (response.ok) {
      if (data.items && data.items.length > 0) {
        return data.items.map((elem)=>elem.id.videoId);
      }
    }
    return backupVideoList;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return backupVideoList;
  }
}

async function displaySelectedVideo(index) {
  const searchQuery = 'monkey';
  const maxResults = 10; // number of results to pull
  const channelId = 'UCpVm7bg6pXKo1Pr6k5kxG9A' // nationalGeographic
  getVids(searchQuery, maxResults, channelId).then((resp) => {
    appendVideo(resp[index]);
    return resp[index];
  });
}

function toggleVideoVisibility(showVideo) {
  const videoContainer = document.getElementById('video-container');
  const bananaContainer = document.getElementById('banana-container');

  if (showVideo) {
    videoContainer.classList.remove('hidden');
    bananaContainer.classList.add('hidden');
  } else {
    videoContainer.classList.add('hidden');
    bananaContainer.classList.remove('hidden');
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    toggleVideoVisibility(true)
  }, 2000);

  displaySelectedVideo(0);
});

const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', () => {

  toggleVideoVisibility(false);
  setTimeout(() => {
    toggleVideoVisibility(true);
  }, 1000);

  videoIndex < 10 ? videoIndex++ : videoIndex = 0;
  displaySelectedVideo(videoIndex);
})