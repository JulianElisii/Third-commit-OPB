const User = require("../models/users")
const jwt = require("jsonwebtoken")

const singup = async (req, res) => {
    const { name, email, password } = req.body
    if (!name, !email, !password) return res.status(400).send('error al registrarse proporcione informacion correcta');
    const newuser = await new User({ name, email, password });
    newuser.password = await newuser.encrypPassword(password)
    newuser.save()
    const token = jwt.sign({ _id: newuser._id }, process.env.SECRET_TOKEN, {
        expiresIn: "3h"
    })
    res.header('auth-token', token).json(token)
    console.log(newuser)
}

const singin = async (req, res) => {
    const { email, password } = req.body
    const newuser = await User.findOne({ email });
    if (!newuser) return res.status(400).send('Email or Password is wrong');
    const correctPassword = await newuser.validatePassword(password);
    if (!correctPassword) return res.status(400).json('Email or Password is wrong');
    const token = jwt.sign({ _id: newuser._id }, process.env.SECRET_TOKEN, { expiresIn: "3h" })
    res.header('auth-token', token).json(token)
}




module.exports = { singup, singin }