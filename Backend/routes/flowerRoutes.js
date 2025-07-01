const express = require('express');
const router = express.Router();
const multer = require('multer');
const flowerController = require('../controllers/flowerController');
const passport = require('passport');

// Cloudinary Multer setup
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary'); // ✅ You must have this file configured

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'flowers',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

// ✅ Auth route
router.get(
  '/secure',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ message: "You are authorized", user: req.user });
  }
);

// ✅ Flower routes
router.post('/', upload.single('image'), flowerController.addFlower);
router.get('/', flowerController.getFlowers);
router.delete('/:id', flowerController.deleteFlower);
router.get('/:id', flowerController.getFlowerById);


module.exports = router;
