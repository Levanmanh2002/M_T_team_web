const express = require('express');
const router = express.Router();

// mongodb user model
const User = require("./../models/User");

router.delete('/delete/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then((result) => {
        if (result) {
          res.json({
            status: "SUCCESS",
            message: "Account deleted successfully"
          });
        } else {
          res.json({
            status: "FAILED",
            message: "Invalid account ID"
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An error occurred while deleting the account"
        });
      });
  });

module.exports = router;