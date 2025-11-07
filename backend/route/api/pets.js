const express = require('express')
const router = express.Router();

const Pet = require("../../model/Pet")

router.get("/", (req, res) => {
    Pet.find()
    .then((pets) => res.json(pets))
    .catch((err) => res.status(404).json({noPetFound: "No Pet found"}))
})


router.get("/:id", (req, res) => {
    Pet.findById(req.params.id)
    .then((pet) => res.json(pet))
    .catch((err) => res.status(404).json({noPetFound: "No Pet found"}))
})

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newPet = new Pet({
      name: req.body.name,
      ownerUsername: req.body.ownerUsername,
      ownerEmail: req.body.ownerEmail,
      breed: req.body.breed,
      age: req.body.age,
      gender: req.body.gender,
      weight: req.body.weight,
      neutered: req.body.neutered,
      indoor: req.body.indoor,
      bluetooth: req.body.bluetooth,
      image: req.body.image,
    });

    const pet = await newPet.save();
    res.json(pet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create pet" });
  }
})

router.delete("/:id", async (req, res) => {
    Pet.findByIdAndDelete(req.params.id)
    .then((pet) => res.json({msg: 'Pet deleted successfully'}))
    .catch((err) => res.status(404).json({error: "No such item"}))
})

router.put("/:id", (req, res) => {
    Pet.findByIdAndUpdate(req.params.id, req.body)
    .then((pet) => res.json({msg: 'Pet updated successfully'}))
    .catch((err) => res.status(400).json({error: "Unable to update pet"}))
})

module.exports = router;