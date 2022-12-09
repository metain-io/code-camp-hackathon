module.exports = class BaseModule {
  constructor (opts) {
    const { network, mode, jobQueues, redisClient } = opts;
    this.jobQueues = jobQueues;
    this.redisClient = redisClient;
    this.network = network;
    this.mode = mode;
  }

  start () {
    // EMPTY    
  }

  logSettledErrors (settledResults, tag) {
    for (const result of settledResults) {
      if (result.status === "rejected") {
        console.error("[ERROR]", tag || "", result.reason);
      }
    }
  }
}