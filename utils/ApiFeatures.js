const { Op } = require("sequelize");

class ApiFeatures {
  // assign properties that need to use in method
  constructor(queryString, model) {
    this.query = {};
    this.queryString = queryString;
    this.model = model;
  }

  // filtering method
}
