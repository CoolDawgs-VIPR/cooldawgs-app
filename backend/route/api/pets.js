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

router.post("/", (req, res) => {
    Pet.create(req.body)
    .then((pet) => res.json({msg: 'Pet added successfully'}))
    .catch((err) => res.status(400).json({error: "Unable to add pet"}))
})

router.delete("/:id", auth, async (req, res) => {
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