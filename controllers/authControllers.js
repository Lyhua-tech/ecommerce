const Users = require('../models/Users');
const Role = require('../models/Roles')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const { promisify } = require('util');

const signup = async(req, res) => {
    const {email, username, password} = req.body;
    try {
        const user = await Users.create({email, username, password});

        const role = await Role.findOne({where: {title: 'buyer'}})
        await user.addRole(role)
        //send message
        res.status(201).json({
            status: 'sucess',
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

const becomeSeller = async(req, res) => {
  try {
    const user = await Users.findByPk(req.user.id);
    const sellerRole = await Role.findOne({where: {title: 'seller'}})

    await user.addRole(sellerRole)

    res.status(200).json({
      status: 'success',
      message: 'You are now a seller!',
    });
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
        const user = await Users.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'user is not found!',
            })
        }

        // compare encrypt password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid Password or Username'
            })
        }
         //generate jwt for sign in 
         const token = jwt.sign({id: user.id, username:user.username}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        res.status(200).json({
            status: 'success',
            token,
            message: "Login successfully!"
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
}

const protected = async(req, res) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1]
    } 

    // check whether it has token or not
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in! Please log in to get access.'
      })
    }

    // check whether the token is valid or not
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // check whether it has in database or not
    const currentUser = await Users.findByPk(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'this user does not exist'
      })
    }

    // 5) Grant access to the protected route
    // Attach the user to the request object for access in the next middleware
    req.user = currentUser;

  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    })
  }
}

module.exports = {signup, login, becomeSeller, protected}