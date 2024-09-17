const { Op } = require("sequelize")

const apiFeatures = (queryString, model) => {
  const query = {};
  const queryObj = {...queryString};
  const excludeField = ['page', 'sort', 'fields', 'limit'];

  excludeField.forEach(element => {
    delete queryObj[element];
  });

  const filtering = () => {

    // loop through each query object key and handle sequelize operator
    const filter = {};

    for (const field in queryObj) {
      const value = queryObj[field];
      
      if(typeof value === 'object') {
        if (value.get) filter[field] = { [Op.gte] : value.gte};
        if (value.gt) filter[field] = { [Op.gt] : value.gt};
        if (value.lte) filter[field] = { [Op.lte]: value.lte};
        if (value.lt) filter[field] = { [Op.lt] : value.lt};
        else { filter[field] = value;}
      }
    }

    query.where = filter;
    return this;
  }

  return {
    filtering,
  }
}

module.exports = apiFeatures;