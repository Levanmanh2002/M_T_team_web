const express = require('express');
const router = express.Router();
const AudioFile = require("../../models/AudioFile")

router.get('/api/search', async (req, res) => {
    try {
      const { keyword } = req.query;
      const regex = new RegExp(keyword, 'i');
      const audioFiles = await AudioFile.find({
        $or: [
          { title: regex },
          { artist: regex },
        ],
      }).sort({ createdAt: -1 });
      res.json(audioFiles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing request' });
    }
});  

module.exports = router;