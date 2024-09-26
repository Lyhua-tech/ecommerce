const express = require('express');

const baseController = (model, uniqueField=[], associate) => {

    const getall = async(req, res) => {
        try {
            const result = await model.findAll({include: associate});

            res.status(200).json({
                status: 'success',
                data: {
                    result
                }
            })
        } catch (error) {
            res.status(404).json({
                status: 'fail',
                message: error.message
            })
        }
    }
}