const mongoose = require("mongoose");
const Wihslist = require("../models/wish.model");
const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {

  if (!req.body.userId || !req.body.productId) {
    return res.status(400).send({ message: "userId and productId are required" });
  }     

  try {
    const allitems = await Wihslist.find({ userId: req.params.id })
      .populate({ path: "productId" })
      .lean()
      .exec();
    return res.status(200).send(allitems);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.body.userId);
    const productId = mongoose.Types.ObjectId(req.body.productId);
    const prod = await Wihslist.deleteOne({ userId, productId }).lean().exec();
    return res.status(200).send(prod);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  console.log("Request body:", req.body); // Log incoming data
  try {
    const prod = await Wishlist.create(req.body);
    console.log("Saved to DB:", prod); // Confirm database save
    return res.status(200).send(prod);
  } catch (err) {
    console.error("Error saving to DB:", err.message); // Log errors
    return res.status(400).send({ message: err.message });
  }
});


module.exports = router;
