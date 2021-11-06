const express = require("express");
const app = express();
const productRoutes = require("./api/routes/product");
const userRoutes = require("./api/routes/user");
const mongoose = require("mongoose");
const logger = require("morgan");

//assgin .env file to proccess.env
require("dotenv").config();

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI).catch((err) => console.log(err));

//logger middleware - dev dependency
app.use(logger("dev"));

//body parser
app.use(express.json());

//products route
app.use("/products", productRoutes);
app.use("/users", userRoutes);

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
