const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


//@desc        Register User
//@route       POST /api/users
//@access      Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400).json({ message: 'Please add all fields' })
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        name,
        email,
        password: hashPassword
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id, user.email)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//@desc        Login User
//@route       POST /api/users/login
//@access      Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error('Please provide all the fields')
    }

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id, user.email)

        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

//@desc        Get My Data
//@route       GET /api/users/me
//@access      Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}