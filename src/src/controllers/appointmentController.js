const store = require("../services/dataStore");
const Appointment = require("../models/Appointment");

async function createAppointment(req, res) {
  try {
    if (store.isDbConnected()) {
      await Appointment.create(req.body);
    } else {
      store.addAppointment(req.body);
    }

    return res.redirect("/home");
  } catch (error) {
    console.error("Failed to create appointment", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getAppointments(req, res) {
  try {
    const appointments = store.isDbConnected()
      ? await Appointment.find({})
      : store.appointments;

    return res.json(appointments);
  } catch (error) {
    console.error("Failed to fetch appointments", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createAppointment,
  getAppointments,
};
