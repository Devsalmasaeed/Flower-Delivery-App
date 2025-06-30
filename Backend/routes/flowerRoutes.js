const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const flowerController = require('../controllers/flowerController');
const passport = require('passport');


router.get(
  '/secure',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ message: "You are authorized", user: req.user });
  }
);


// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('image'), flowerController.addFlower);
router.get('/', flowerController.getFlowers);
router.delete('/:id', flowerController.deleteFlower);

module.exports = router;
