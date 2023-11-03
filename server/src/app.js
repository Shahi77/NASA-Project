const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const morgan = require("morgan");
const v1 = require("./routes/version1");

// Cross Origin Communication
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public"))); //middleware to serve frontend

app.use(morgan("combined"));
app.use("/v1", v1); //v1 api call

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = {
  app,
};
