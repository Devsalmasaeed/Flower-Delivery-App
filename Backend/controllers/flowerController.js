const Flower = require('../models/flowerModel');

// POST
exports.addFlower = async (req, res) => {
  const { name, category, price, description } = req.body;
  const image = req.file?.path;

  try {
    const flower = new Flower({ name, category, price, description, image });
    await flower.save();
    res.status(201).json(flower);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET
exports.getFlowers = async (req, res) => {
  try {
    const flowers = await Flower.find().sort({ createdAt: -1 });
    res.json(flowers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteFlower = async (req, res) => {
  try {
    const deleted = await Flower.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
