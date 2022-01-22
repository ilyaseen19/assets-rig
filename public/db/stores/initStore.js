const DataStore = require("nedb-promises");
const Ajv = require("ajv");
const isDev = require("electron-is-dev");
const initialsSchema = require("../schemas/initials");
const { app } = require("electron");
const path = require("path");

class initStore {
  constructor() {
    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true,
    });

    this.schemaValidator = ajv.compile(initialsSchema);
    const userData = app.getAppPath("userData");
    const dbPath = path.join(
      isDev ? userData : process.resourcesPath,
      "DataStore/initials.db"
    );
    this.db = DataStore.create({
      filename: dbPath,
      timestampData: true,
      autoload: true,
    });
  }

  validate(data) {
    return this.schemaValidator(data);
  }

  create(data) {
    return this.db.insert(data);
  }

  read(_id) {
    return this.db.findOne({ _id }).exec();
  }

  readAll() {
    return this.db.find();
  }

  remove(_id) {
    return this.db.remove({ _id });
  }

  update(dishData) {
    return this.db.update({ _id: dishData._id }, dishData.data);
  }
}

module.exports = new initStore();
