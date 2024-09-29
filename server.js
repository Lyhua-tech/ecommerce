const app = require("./app");
const sequelize = require("./config/databases");
const morgan = require("morgan");
const dotenv = require("dotenv");
const model = require("./models/index");

dotenv.config({ path: `${process.cwd()}/.env` });

const syncDb = async () => {
  try {
    await sequelize.sync({ force: false, logging: false, alter: true });
    console.log("Success fully sync database");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
syncDb();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
