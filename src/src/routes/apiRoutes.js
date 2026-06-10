const express = require("express");

const appointmentController = require("../controllers/appointmentController");

const router = express.Router();

router.get("/appointments", appointmentController.getAppointments);

module.exports = router;
