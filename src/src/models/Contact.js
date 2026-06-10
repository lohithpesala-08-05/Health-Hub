const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    number: Number,
    msg: String,
  },
  {
    collection: "contacts",
  }
);

module.exports = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
