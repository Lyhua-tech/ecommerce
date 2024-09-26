// const exporess = require('express')
// const User = require("../../models/Users")
// const Roles = require('../models/Roles')

// exports.getAllUser = async(req, res) => {
//     try {
//         const user = await User.findAll({include: Roles});

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 user
//             }
//         })
//     } catch (error) {
//         res.status(404).json({
//             stauts: 'fail',
//             message: 'error',
//         })
//     }
// }