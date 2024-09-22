const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user ) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await user.generateAuthToken();

    res.json({
        message: "Login successful",
        token,
        user: { id: user._id, fullName: user.fullName, email: user.email }
    });
});

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName , email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.status(201).json({
        message: "User created successfully",
        token,
        user: { id: user._id, firstName: user.firstName, lastName : user.lastName, email: user.email }
    });
});



const getUser = asyncHandler(async (req, res) => {
    const id = req.user.id
    try {
        const user = await userModel.find({ _id: id })
        res.status(200).json({ user: user[0] })
    } catch (error) {
        res.status(502).json({ message: error.message })
    }
})

module.exports = {
    loginUser,
    registerUser,
    getUser
}

