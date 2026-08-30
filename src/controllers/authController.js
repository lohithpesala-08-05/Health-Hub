const store = require("../services/dataStore");
const User = require("../models/User");
const { hashValue, verifyValue } = require("../utils/hash");

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  let dbUser = null;

  if (store.isDbConnected()) {
    dbUser = await User.findOne({
      email: { $regex: `^${escapeRegExp(normalizedEmail)}$`, $options: "i" },
    });
  }

  const memoryUser = store.users.find(
    (savedUser) => normalizeEmail(savedUser.email) === normalizedEmail
  );

  return dbUser || memoryUser || null;
}

async function register(req, res) {
  const { name, email, password, dob, gender, contact } = req.body;
  const normalizedEmail = normalizeEmail(email);

  try {
    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser) {
      return res.status(409).send("User already exist");
    }

    const userPayload = {
      name,
      email: normalizedEmail,
      password: hashValue(password),
      dob,
      gender,
      contact,
    };

    if (store.isDbConnected()) {
      await User.create(userPayload);
    }

    const existingMemoryUser = store.users.find(
      (savedUser) => normalizeEmail(savedUser.email) === normalizedEmail
    );

    if (!existingMemoryUser) {
      store.addUser(userPayload);
    }

    return res.redirect("/login");
  } catch (error) {
    console.error("Failed to register", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    const hasHashedPassword =
      user && /^[a-f0-9]{64}$/i.test(String(user.password || ""));
    const isPasswordValid =
      user &&
      (verifyValue(password, user.password) || String(user.password) === password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid User");
    }

    if (user && !hasHashedPassword) {
      const hashedPassword = hashValue(password);

      if (store.isDbConnected() && user._id) {
        await User.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
      }

      const memoryUser = store.users.find(
        (savedUser) => normalizeEmail(savedUser.email) === normalizeEmail(user.email)
      );

      if (memoryUser) {
        memoryUser.password = hashedPassword;
        store.save();
      }
    }

    return res.redirect("/home");
  } catch (error) {
    console.error("Failed to Login", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  register,
  login,
};
