const { fireAndForget, IRIS_BUSES } = require("@metain/pkg/iris");
const { getSmartContractConfig } = require("@metain/blockchain-rpc");

const BaseModule = require("./BaseModule");

const constant = require("../constant");
const provider = require("../provider");

module.exports = class ApplyBlock extends BaseModule {
  constructor(opts) {
    super(opts);
    this.queue = this.jobQueues.get("apply-block", this.network, this.mode, { priority: 1 });
  }

  start () {
    this.queue.start({
      process: this.process.bind(this),
      onCompleted: (job) => {
        // TODO
      },
      onFailed: (job, err) => {
        console.error(err);
      }
    });

    const smartContractConfig = getSmartContractConfig(this.network, this.mode);
    this.queue.add(
      {},
      {
        jobId: `apply-block:${this.network}:${this.mode}`,
        repeat: { every: (smartContractConfig.newBlockTime || 0) * 10 + 3 * 60000 }
      }
    );
  }

  async process (_job) {
    try {
      const network = this.network;
      const mode = this.mode;

      const latestBlockNumber = await this.redisClient.get(`latest-block-number:${network}:${mode}`);
      if (!latestBlockNumber) {
        return;
      }

      const smartConfig = getSmartContractConfig(network, mode);

      console.log(`APPLY BLOCKS FOR ${network}:${mode}`);

      await fireAndForget({
        env: process.env.ENV,
        bus: IRIS_BUSES.BUS_CRITICAL.NAME,
        service: "cerberus",
        action: "confirm-deposits",
        data: {
          network, mode, block: latestBlockNumber, verifications: smartConfig.requiredVerifications
        }
      });
    } catch (ex) {
      console.error(ex);
    }
  }
};
