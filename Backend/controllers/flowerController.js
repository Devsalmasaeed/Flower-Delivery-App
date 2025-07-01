const Flower = require('../models/flowerModel');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

// ✅ ADD FLOWER
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

// ✅ GET ALL FLOWERS
exports.getFlowers = async (req, res) => {
  try {
    const flowers = await Flower.find().sort({ createdAt: -1 });
    res.status(200).json(flowers);
  } catch (err) {
    console.error("Get Flowers Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE FLOWER
exports.deleteFlower = async (req, res) => {
  try {
    const deleted = await Flower.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Flower not found" });
    }
    res.status(200).json({ message: "Flower deleted successfully", flower: deleted });
  } catch (err) {
    console.error("Delete Flower Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
