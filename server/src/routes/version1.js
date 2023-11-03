const express = require("express");

const planetsRouter = require("./planets/planets.router");
const launchesRouter = require("./launches/launches.router");

const v1 = express.Router();

v1.use("/planets", planetsRouter);
v1.use("/launches", launchesRouter);

module.exports = v1;
