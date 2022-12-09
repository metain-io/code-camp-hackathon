const Redis = require("ioredis");

const { configureAWS } = require("@metain/pkg/awsHelper");

const { JobQueuePool } = require("@metain/typhon-helper");

const EventBusHandler = require("./modules/EventBusHandler");
const ScanNewBlock = require("./modules/ScanNewBlock");
const ProcessBlock = require("./modules/ProcessBlock");
const ConfirmBlock = require("./modules/ConfirmBlock");
const ApplyBlock = require("./modules/ApplyBlock");

const provider = require("./provider");

require("events").EventEmitter.defaultMaxListeners = 64;

process.env.ENV = process.env.ENV || "beta";
process.env.PRINCIPLE = provider.common.INSTITUTIONS.PRINCIPLE;
configureAWS(process.env.AWS_PROFILE_NAME || process.env.ENV, process.env.AWS_REGION_NAME);

const MODULES = {
  EventBusHandler: EventBusHandler,
  ScanNewBlock: ScanNewBlock,
  ProcessBlock: ProcessBlock,
  ConfirmBlock: ConfirmBlock,
  ApplyBlock: ApplyBlock,
};

const SLAVE_MODULES = [
  {
    name: "ProcessBlock",
  },
  {
    name: "ConfirmBlock",
  }
];

const TEST_MODULES = [
  // ScanNewBlock 
  {
    name: "ApplyBlock",
    network: "sol",
    mode: "testnet",
  },
];

const PRODUCTION_MODULES = [
  // ScanNewBlock
  {
    name: "ScanNewBlock",
    network: "sol",
    mode: "mainnet",
  },
  // ApplyBlock  
  {
    name: "ApplyBlock",
    network: "sol",
    mode: "mainnet",
  },
];

let redisClient;
let jobQueues;
let jobRedisClients = {};

/**
 * @name createJobRedisClient
 * @description Helper function to create redis client for bull job queues
 * @param {string} type
 * @param {object} redisOpts
 * @returns iroedis
 */
function createJobRedisClient(type, redisOpts) {
  const redisConfig = {};

  if (!jobRedisClients[type]) {
    if (["bclient", "subscriber"].includes(type)) {
      jobRedisClients[type] = new Redis({ ...redisOpts, ...redisConfig, maxRetriesPerRequest: null });
    } else {
      jobRedisClients[type] = new Redis({ ...redisOpts, ...redisConfig });
    }
  }

  return jobRedisClients[type];
}

async function main(opts) {
  redisClient = new Redis();

  jobQueues = new JobQueuePool({ createClient: createJobRedisClient });

  opts.modules.forEach((module) => {
    const MODULE = MODULES[module.name];
    if (MODULE) {
      new MODULE({ ...module, jobQueues, redisClient }).start();
    }
  });
}


if (process.env.APP === "master") {
  if (process.env.ENV === "prod") {
    main({
      modules: PRODUCTION_MODULES,
    });
  } else {
    main({
      modules: TEST_MODULES,
    });
  }
} else {
  main({ modules: SLAVE_MODULES });
}