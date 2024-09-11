import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const userExists = await userModel.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "User already exists!" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await userModel.create({ name, email, password: hashedPassword })
        res.json({ message: "User registered successfully!", accessToken: generateToken(user._id) })
    } catch (e) {
        return res.status(400).json({ message: e.message })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User not found!' })
        }
        if (user && await bcrypt.compare(password, user.password)) {
            return res.json({ message: 'Login success!', accessToken: generateToken(user._id) })
        }
        else{
            return res.status(400).json({ message: 'Invalid password!' })
        }
    }
    catch (e) {
        return res.status(400).json({ message: e.message })
    }
}

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '6h'})
}