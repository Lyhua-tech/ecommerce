const baseController = (model, associate) => {
  const getAll = async (req, res) => {
    try {
      const result = await model.findAll({ include: associate });

      res.status(200).json({
        status: "success",
        data: { result },
      });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message,
      });
    }
  };

  const createOne = async (req, res) => {
    try {
      const result = await model.create(req.body);

      res.status(201).json({
        status: "success",
        data: { result },
      });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message,
      });
    }
  };

  const getOneRecord = async (req, res) => {
    const { id } = req.params;
    try {
      const oneRecord = await model.findOne({ where: { id }, include: associate });

      res.status(200).json({
        status: "success",
        data: { oneRecord },
      });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message,
      });
    }
  };

  const updateOneRecord = async (req, res) => {
    const { id } = req.params;
    try {
      const oneRecord = await model.update(req.body, { where: { id } });

      res.status(200).json({
        status: "success",
        data: { oneRecord },
      });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message,
      });
    }
  };

  const deleteaRecord = async (req, res) => {
    try {
      const { id } = req.params;
      const oneRecord = await model.destroy({ where: { id } });

      if (!oneRecord) {
        return res.status(404).json({
          status: "fail",
          message: "Record not found!",
        });
      }

      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: error.message,
      });
    }
  };

  return { getAll, createOne, getOneRecord, updateOneRecord, deleteaRecord };
};

module.exports = baseController;
