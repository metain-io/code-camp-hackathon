const { getSmartContractConfig } = require("@metain/blockchain-rpc");
const { createRPC, fetchSecret } = require("@metain/typhon-helper");
const BaseModule = require("./BaseModule");

const constant = require("../constant");
const provider = require("../provider");

module.exports = class ScanNewBlock extends BaseModule {
  constructor(opts) {
    super(opts);
    this.queue = this.jobQueues.get("scan-new-block", this.network, this.mode, { priority: 10 });
    this.processQueue = this.jobQueues.get("process-block", "", "", { priority: 5 });
  }

  start() {
    this.queue.start({
      process: this.process.bind(this),
      onCompleted: (job) => {
        // TODO
      },
      onFailed: (job, err) => {
        // TODO
      },
    });

    const smartContractConfig = getSmartContractConfig(this.network, this.mode);
    this.queue.add(
      {},
      {
        jobId: `scan-new-block:${this.network}:${this.mode}`,
        repeat: { every: smartContractConfig.newBlockTime || 1000 },
      }
    );
  }

  async process(_job) {
    try {
      const rpc = await createRPC({
        jobQueues: this.jobQueues,
        redisClient: this.redisClient,
        network: this.network,
        mode: this.mode,
      });

      const latestBlockNumber = await rpc.getBlockNumber();
      if (!latestBlockNumber) {
        return;
      }

      let currentBlockNumber = await this.redisClient.get(`block-number:${this.network}:${this.mode}`);
      if (!currentBlockNumber || isNaN(currentBlockNumber)) {
        console.log("ScanNewBlock currentBlockNumber: ", currentBlockNumber);
        await this.redisClient.set(`block-number:${this.network}:${this.mode}`, latestBlockNumber);
        return;
      }

      // the RPC server is corrupted in this case
      if (latestBlockNumber <= currentBlockNumber) {
        return;
      }

      const endBlockNumber = Math.min(currentBlockNumber + constant.MAX_BLOCKS_PER_SCAN, latestBlockNumber);

      console.log(`SCAN BLOCK ${this.network}:${this.mode} ${currentBlockNumber} TO ${endBlockNumber}`);

      let promises = [];
      for (let i = currentBlockNumber; i < endBlockNumber; ++i) {
        promises.push(
          this.processQueue.add(
            { network: this.network, mode: this.mode, block: i, retry: 0 },
            { jobId: `${this.network}:${this.mode}:${i}:0` }
          )
        );
      }
      await Promise.all(promises);

      await Promise.all([
        this.redisClient.set(`latest-block-number:${this.network}:${this.mode}`, latestBlockNumber),
        this.redisClient.set(`block-number:${this.network}:${this.mode}`, endBlockNumber),
      ]);
    } catch (ex) {
      console.error(ex);
    }
  }
};
