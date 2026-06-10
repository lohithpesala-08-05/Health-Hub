const store = require("../services/dataStore");
const Contact = require("../models/Contact");

async function createContact(req, res) {
  try {
    if (store.isDbConnected()) {
      await Contact.create(req.body);
    } else {
      store.addContact(req.body);
    }

    return res.redirect("/home");
  } catch (error) {
    console.error("Failed to save contact", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createContact,
};
