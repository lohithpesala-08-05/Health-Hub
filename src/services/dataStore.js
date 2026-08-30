const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "..", "..", "data", "store.json");

const defaultStore = {
  users: [],
  appointments: [],
  contacts: [],
};

function ensureDataFile() {
  const dataDir = path.dirname(dataFilePath);

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultStore, null, 2));
  }
}

function loadStore() {
  try {
    ensureDataFile();
    const fileContent = fs.readFileSync(dataFilePath, "utf8");
    const parsedStore = JSON.parse(fileContent);

    return {
      users: Array.isArray(parsedStore.users) ? parsedStore.users : [],
      appointments: Array.isArray(parsedStore.appointments)
        ? parsedStore.appointments
        : [],
      contacts: Array.isArray(parsedStore.contacts) ? parsedStore.contacts : [],
    };
  } catch (error) {
    console.error("Failed to load local data store", error);
    return { ...defaultStore };
  }
}

const memoryStore = loadStore();
let dbConnected = false;

function saveStore() {
  try {
    ensureDataFile();
    fs.writeFileSync(dataFilePath, JSON.stringify(memoryStore, null, 2));
  } catch (error) {
    console.error("Failed to save local data store", error);
  }
}

module.exports = {
  ...memoryStore,
  save() {
    saveStore();
  },
  addUser(user) {
    this.users.push(user);
    saveStore();
  },
  addAppointment(appointment) {
    this.appointments.push(appointment);
    saveStore();
  },
  addContact(contact) {
    this.contacts.push(contact);
    saveStore();
  },
  isDbConnected() {
    return dbConnected;
  },
  setDbConnected(value) {
    dbConnected = value;
  },
};
