const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res
        .status(400)
        .json({ message: "No subscriber found with the given id" });
    }
    res.status(200).json(subscriber);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedTo: req.body.subscribedTo,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res
        .status(400)
        .send("No Subscriber found with id " + req.params.id);
    }
    if(req.body.name != null)
        subscriber.name = req.body.name;
    if(req.body.subscribedTo != null)
        subscriber.subscribedTo = req.body.subscribedTo;

    const newSubscriber = subscriber.save();
    res.status(200).json(newSubscriber);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res
        .status(400)
        .send("No Subscriber found with id " + req.params.id);
    }

    await subscriber.deleteOne();

    res.status(200).json({message: "Successfully removed"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
