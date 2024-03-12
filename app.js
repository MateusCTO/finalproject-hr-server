// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
// ℹ️ Connects to the database
require("./db");
const bodyParser = require("body-parser");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// MIDDLEWARE
// Use the CORS middleware with options to allow requests from specific IP addresses and domains
app.use(
  cors({
    origin: ["http://localhost:5173"], // Add the URLs of allowed origins to this array
  })
);

app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.static("public"));

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

/* ROUTES */
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const employeesRoutes = require("./routes/employee.routes");
app.use("/api", /*isAuthenticated */ employeesRoutes); // '/api' works like a default value that goes before every route path you create inside cohortRoutes.

const budgetRoutes = require("./routes/budgets.routes");
app.use("/api", /*isAuthenticated */ budgetRoutes);

// To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
