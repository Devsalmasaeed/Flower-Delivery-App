const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');
const flowerController = require('../controllers/flowerController');
const passport = require('passport');

// 🔐 Auth test route (optional)
router.get(
  '/secure',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ message: "You are authorized", user: req.user });
  }
);

// 🌩 Cloudinary + Multer setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'flowers',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});
const upload = multer({ storage });

// 🌸 Flower Routes
router.post('/', upload.single('image'), flowerController.addFlower);
router.get('/', flowerController.getFlowers);
router.delete('/:id', flowerController.deleteFlower);

module.exports = router;
