const express = require('express');

const baseController = (model, uniqueField=[], associate) => {

    const getAll = async(req, res) => {
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

    const createOne = async(req, res) => {
        try {
            const result = await model.create(req.body);

            res.status(201).json({
                status: 'success',
                data: {
                    result
                }
            })
        } catch (error) {
            res.status(404).json({
                status: 'fail',
                message: error.message,
            })
        }
    }

    const getOneRecord = async(req, res) => {
        const { id } = req.params

        const oneRecord = await model.findOne({where : id, include:associate});
        try {
            res.status(201).json({
                status: 'success',
                data: {
                    oneRecord
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