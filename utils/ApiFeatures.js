const {Op, TableHints} = require("sequelize");

class ApiFeatures {
    // assign properties that need to use in method
    constructor(queryString, model){
        this.query = {};
        this.queryString = queryString;
        this.model = model;
    }

    // filtering method
    filtering(){
        const queryObj = {...this.queryString};
        const excludefields = ['sort', 'page', 'limit', 'fields'];
        excludefields.forEach((el) => {
            delete queryObj[el]
        })

        // this function will check if the value is number or not
        const isNum = (n) => !isNaN(parseFloat(n)) && isFinite(n);

        Object.keys.forEach((key) => {
            const value = queryObj[key];
            const match = key.match(/^(\w+)\[(gte|gt|lte|lt)\]$/);

            if (match) {
                const field = match[1];
                const operator = match[2];
                const numerValue = isNum(value) ? parseFloat(value) : value;


                if(!queryObj[field]) {
                    queryObj[field] = {};
                }

                const operationMapping = {
                    gte: Op.gte,
                    gt: Op.gt,
                    lte: Op.lte,
                    lt: Op.lt,
                }

                queryObj[field][operationMapping[operator]] = value;
                delete queryObj[key];
            } else if (query)

        })
    }
}