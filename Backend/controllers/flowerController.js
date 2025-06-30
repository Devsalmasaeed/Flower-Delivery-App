const Flower = require('../models/flowerModel');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

exports.addFlower = async (req, res) => {
  const { name, category, price, description } = req.body;
  let image = '';

  try {
    if (req.file?.path) {
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result.secure_url;

      // Delete local file after upload
      fs.unlinkSync(req.file.path);
    }

    const flower = new Flower({ name, category, price, description, image });
    await flower.save();
    res.status(201).json(flower);
  } catch (err) {
    console.error("Add Flower Error:", err.message);
    res.status(400).json({ error: err.message });
  }
};
