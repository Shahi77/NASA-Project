const http = require("http");
const mongoose = require("mongoose");
const { app } = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

require("dotenv").config();
const { DATABASE } = process.env;

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(DATABASE);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
}

startServer();
