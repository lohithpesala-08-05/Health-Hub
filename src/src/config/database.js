const mongoose = require("mongoose");
const store = require("../services/dataStore");

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Healthhub";

function connectDatabase() {
  mongoose
    .connect(mongoUri)
    .then(() => {
      store.setDbConnected(true);
      console.log("Connection successful");
    })
    .catch((error) => {
      store.setDbConnected(false);
      console.log("Database connection failed. Running with in-memory fallback.");
      console.log(error.message);
    });
}

module.exports = connectDatabase;
