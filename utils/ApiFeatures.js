const { Op } = require("sequelize");

const apiFeatures = (queryString, model) => {
  const query = {};
  const queryObj = { ...queryString };
  const excludeFields = ['page', 'sort', 'fields', 'limit'];

  excludeFields.forEach(element => {
    delete queryObj[element];
  });

  const filtering = () => {
    const filters = {};

    for (const field in queryObj) {
      const value = queryObj[field];

      if (typeof value === 'object') {
        if (value.gte) filters[field] = { [Op.gte]: value.gte };
        if (value.gt) filters[field] = { [Op.gt]: value.gt };
        if (value.lte) filters[field] = { [Op.lte]: value.lte };
        if (value.lt) filters[field] = { [Op.lt]: value.lt };
      } else {
        filters[field] = value; // Direct assignment for non-object fields
      }
    }

    query.where = filters;
    return apiFeatures(queryString, model); // Return for method chaining
  };

  const sorting = () => {
    if (queryString.sort) {
      const sortBy = queryString.sort.split(',').map(el => {
        let field = el;
        let order = "ASC";
        if (el.startsWith('-')) {
          field = el.slice(1);
          order = "DESC";
        }
        return [field, order];
      });
      query.order = sortBy; // sortBy = [[field, order]]
    } else {
      query.order = [["id", "ASC"]];
    }
    return apiFeatures(queryString, model); // Return for method chaining
  };

  const limitFields = () => {
    if (queryString.fields) {
      const fields = queryString.fields.split(",");
      query.attributes = fields; // Specify which fields to include in the result
    }
    return apiFeatures(queryString, model); // Return for method chaining
  };

  const pagination = () => {
    const page = Math.max(1, parseInt(queryString.page, 10)) || 1; // Ensure page is at least 1
    const limit = Math.max(1, parseInt(queryString.limit, 10)) || 100; // Ensure limit is at least 1

    const offset = (page - 1) * limit;

    query.limit = limit;
    query.offset = offset;

    return apiFeatures(queryString, model); // Return for method chaining
  };

  const execute = async(options= {}) => {
    try {
      return await model.findAll({ ...query, ...options }); // Execute Sequelize findAll with constructed query options
    } catch (error) {
      console.error("Error executing query:", error);
      throw error; // Rethrow or handle error as needed
    }
  };

  return {
    filtering,
    sorting,
    limitFields,
    pagination,
    execute,
  };
};

module.exports = apiFeatures;