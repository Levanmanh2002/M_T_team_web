const express = require('express');
const router = express.Router();
const AudioFile = require("../../models/AudioFile")

router.delete('/audio/:id', async (req, res) => {
    try {
      const audioId = req.params.id;
  
      // Kiểm tra nếu bản ghi không tồn tại
      const existingAudioFile = await AudioFile.findById(audioId);
  
      if (!existingAudioFile) {
        return res.status(400).json({ message: 'Audio file not found' });
      }
  
      // Xóa bản ghi
      await AudioFile.deleteOne({ _id: audioId });
  
      res.json({ deleted: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing request' });
    }
});

router.delete('/all/music', async (req, res) => {
    try {
      const result = await AudioFile.deleteMany({});
      res.json({ message: `${result.deletedCount} audio files deleted` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing request' });
    }
});  

module.exports = router;