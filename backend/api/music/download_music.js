const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');
const AudioFile = require("../../models/AudioFile")

router.post('/api/download', async (req, res) => {
  try {
    const videoUrl = req.body.url;
    const info = await ytdl.getInfo(videoUrl, { filter: 'audioonly' });
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
    const downloadUrl = format.url;

    // Kiểm tra nếu bản ghi đã tồn tại
    const existingAudioFile = await AudioFile.findOne({ url: downloadUrl });

    if (existingAudioFile) {
      return res.status(400).json({ message: 'Audio file already exists' });
    }

    // Lưu tệp vào MongoDB bằng Mongoose
    const audioFile = new AudioFile({
      title: req.body.title || '',
      artist: req.body.artist || '',
      url: downloadUrl,
      createdAt: new Date()
    });
    await audioFile.save({ wtimeout: 10000 });

    res.json({ audioFile, savedToMongo: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing request' });
  }
});

router.get('/api/audiofiles', async (req, res) => {
  try {
    const audioFiles = await AudioFile.find().sort({ createdAt: -1 });
    res.json(audioFiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing request' });
  }
});

module.exports = router;
