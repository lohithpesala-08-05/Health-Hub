const path = require("path");

const views = require("../config/viewRegistry");

const rootDir = path.resolve(__dirname, "..", "..");

function render(viewName) {
  return (req, res) => {
    const fileName = views[viewName];

    if (!fileName) {
      return res.status(404).send("View not found");
    }

    return res.sendFile(path.join(rootDir, fileName));
  };
}

module.exports = {
  render,
};
