const fs = require("fs");
const EventEmitter = require("events");
const deepmerge = require("deepmerge");

const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

module.exports = class ConfigBase extends EventEmitter {
  /**
   * @name Constructor
   * @param {*} opts
   */
  constructor(opts) {
    super();

    const { paths } = opts;

    this.paths = paths || [];
    if (!Array.isArray(this.paths)) {
      this.paths = [this.paths];
    }

    this.data = opts.data || {};
  }

  /**
   * @name init
   */
  async init() {
    for (const path of this.paths) {
      await this.reloadConfig(path);
      fs.watchFile(path, (curr, prev) => this.reloadConfig(path));
    }
  }

  /**
   * @name reloadConfig
   * @param {*} path
   * @returns
   */
  async reloadConfig(path) {
    let configData;
    try {
      const configFile = await fs.promises.readFile(path);
      configData = JSON.parse(configFile);
    } catch (ex) {
      return;
    }

    this.data = deepmerge(this.data, configData, { arrayMerge: overwriteMerge });
    this.emit("sync", this.data, path);
  }
};
