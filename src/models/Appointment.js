const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    age: String,
    dob: String,
    services: String,
    gender: String,
    contact: Number,
    date: String,
    timings: String,
  },
  {
    collection: "appointments",
  }
);

module.exports =
  mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);
