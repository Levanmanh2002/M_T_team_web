const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');
const app = express();

router.post('/api/download', async (req, res) => {
  try {
    const videoUrl = req.body.url;
    const info = await ytdl.getInfo(videoUrl, { filter: 'audioonly' });
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
    const downloadUrl = format.url;
    res.json({ downloadUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing request' });
  }
});

module.exports = router;
