const crypto = require("crypto");

function hashValue(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex");
}

function verifyValue(rawValue, hashedValue) {
  return hashValue(rawValue) === hashedValue;
}

module.exports = {
  hashValue,
  verifyValue,
};
