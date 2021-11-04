const express = require("express");
const app = express();

//main route
app.get("/", (req, res, next) => {
  res.status("200").json({
    message: "Basic - Application Programming Interface",
  });
});

//Default route
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  return res.status("404").json({
    error: error.message,
  });
});

module.exports = app;
