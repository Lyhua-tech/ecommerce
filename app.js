const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes")

const app = express();

app.use(express.json());
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use('/api/v1', authRoutes)
app.use("/api/v1", productRoutes);

module.exports = app;
