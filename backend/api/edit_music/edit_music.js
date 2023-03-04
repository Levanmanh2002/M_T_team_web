  const express = require('express');
  const router = express.Router();
const AudioFile = require("../../models/AudioFile")

router.patch('/api/music/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { title, artist } = req.body;
      
      const updatedMusic = await AudioFile.findByIdAndUpdate(id, { title, artist }, { new: true });
      
      if (!updatedMusic) {
        return res.status(404).json({ message: 'Music not found' });
      }
      
      res.json(updatedMusic);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing request' });
    }
});  

module.exports = router;