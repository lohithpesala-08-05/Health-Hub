const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    dob: String,
    gender: String,
    contact: String,
  },
  {
    collection: "userdetails",
  }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
