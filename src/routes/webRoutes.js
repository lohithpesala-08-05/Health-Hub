const express = require("express");

const appointmentController = require("../controllers/appointmentController");
const authController = require("../controllers/authController");
const contactController = require("../controllers/contactController");
const pageController = require("../controllers/pageController");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/appointment", appointmentController.createAppointment);
router.post("/contacts", contactController.createContact);

router.get("/", pageController.render("landing"));
router.get("/home", pageController.render("home"));
router.get("/about", pageController.render("about"));
router.get("/contact", pageController.render("contact"));
router.get("/services", pageController.render("services"));
router.get("/service", pageController.render("service"));
router.get("/login", pageController.render("login"));
router.get("/appointmentdata", pageController.render("appointmentData"));
router.get("/register", pageController.render("register"));
router.get("/appointment", pageController.render("appointment"));
router.get("/bmi", pageController.render("bmi"));
router.get("/day", pageController.render("day"));
router.get("/exercise", pageController.render("exercise"));
router.get("/fitness", pageController.render("fitness"));
router.get("/food", pageController.render("food"));
router.get("/meditation", pageController.render("meditation"));
router.get("/mentalc", pageController.render("mentalCare"));
router.get("/monitoring", pageController.render("monitoring"));
router.get("/personalcare", pageController.render("personalCare"));
router.get("/sleept", pageController.render("sleep"));
router.get("/waterinmo", pageController.render("water"));
router.get("/yoga", pageController.render("yoga"));

module.exports = router;
