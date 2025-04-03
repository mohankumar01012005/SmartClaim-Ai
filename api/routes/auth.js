const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// ✅ Signup Route
router.post('/signup', async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
        console.log("res: ", res);
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
            console.log("res: ", res);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", userId: newUser._id });
        console.log("res: ", res);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
            console.log("res: ", res);
        }

        res.status(200).json({ message: "Login successful", userId: user._id });
        console.log("message: ", message);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});




module.exports = router;
