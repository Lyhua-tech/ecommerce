const {User} = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const signup = async(req, res) => {
    const {email, username, password} = req.body;
    try {
        const user = await User.create({email, username, password});

        //generate jwt for sign in 
        const token = jwt.sign({id: user.id, username:user.username}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

        //send message
        res.status(201).json({
            status: 'sucess',
            token,
            data: {
                user
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
}

const login = async(req, res) => {
    const {username, password} = req.body
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'user is not found!',
            })
        }

        // compare encrypt password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).json({
                status: 'fail',
                message: 'Invalid Password or Username'
            })
        }

        res.status(200).json({
            status: 'success',
            message: "Login successfully!"
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
}

module.exports = {signup, login}