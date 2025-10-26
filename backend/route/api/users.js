
const express = require('express')
const Users = require('../../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

const router = express.Router();

router.post("/authenticate", async (req, res) => {
    const { username, password } = await req.body;
    const user = await Users.findOne({ username: username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "invalid credentials"})
    } else {
        const token = jwt.sign(
            { userid: user.id, username: user.username},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return res.status(200).json({ token, username, email: user.email });
    }
});

router.post("/register", async (req, res) => {
    const { username, password, email } = await req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new Users({username: username, password: passwordHash, email: email });
    try {
        await newUser.save();
        return res.status(200).json({ message: "added new user"});
    } catch (error) {
        if (error.code == 11000) {
            const duplicatefield = Object.keys(error.keyValue).join(",");
            console.log("duplicate " + duplicatefield);
            return res.status(401).json({ message: "duplicate " + duplicatefield});
        } else {
            return res.status(401).json({ message: "there was an error" + error});
        }
    }
})

module.exports = router;