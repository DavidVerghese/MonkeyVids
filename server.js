require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(cors());

app.get('/videos', async (req, res) => {
  apiKey = process.env.API_KEY;
  const { searchQuery, maxResults } = req.query;

  if (!searchQuery || !maxResults) {
    return res.status(400).json({ error: 'Missing required query parameters: searchQuery, maxResults' });
  }

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(searchQuery)}&type=video&key=${apiKey}`);
    const data = await response.json();

    if (response.ok) {
      return res.status(200).json(data);
    } else {
      return res.status(response.status).json({ error: data.error || 'Unknown error from YouTube API' });
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});