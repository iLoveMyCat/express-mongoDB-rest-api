const express = require("express");
const app = express();
const productRoutes = require("./api/routes/product");

const logger = require("morgan");

//assgin .env file to proccess.env
require("dotenv").config();

//logger middleware - dev dependency
app.use(logger("dev"));

//products route
app.use("/products", productRoutes);

//main route
app.get("/", (req, res, next) => {
  res.status("200").json({
    message: "Basic - Application Programming Interface",
  });
});

//Default route
app.use((req, res, next) => {
  return res.status("404").json({
    error: {
      message: "Not found",
      status: 404,
    },
  });
});

module.exports = app;
