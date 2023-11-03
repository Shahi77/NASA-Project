const mongoose = require("mongoose");

const { DATABASE } = process.env;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});
async function mongoConnect() {
  await mongoose.connect(DATABASE);
}

module.exports = {
  mongoConnect,
  // mongoDisconnect,
};
