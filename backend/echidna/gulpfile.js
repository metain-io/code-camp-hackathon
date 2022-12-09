const os = require("os");
const child_process = require("child_process");
const path = require("path");
const fs = require("fs");
const { NodeSSH } = require("node-ssh");
const webpack = require("webpack");

const argv = require("yargs").argv;

async function connectSSH (connectionUrl) {
  const sshKeyPath = path.join(os.homedir(), ".ssh", "id_rsa");
  const sshPrivateKey = fs.readFileSync(sshKeyPath, "ascii");

  // Connect
  const ssh = new NodeSSH();
  const hostUrl = connectionUrl.split("@");

  await ssh.connect({
    host: hostUrl[1],
    privateKey: sshPrivateKey,
    username: hostUrl[0]
  });

  return { ssh, user: hostUrl[0], sudoer: hostUrl[2] || hostUrl[0] };
}

async function sshStreamExec (ssh, cmd, args, cwd) {
  try {
    await ssh.exec(cmd, args, {
      cwd,
      onStdout (chunk) {
        console.log(chunk.toString("utf8"));
      },
      onStderr (chunk) {
        console.error(chunk.toString("utf8"));
      },
    });
  } catch (ex) {
    console.error(ex);
  }
}

function sshStreamBatch (ssh, batches) {
  return batches.reduce(async (prev, it) => {
    await prev;
    const [cmd, cwd] = it;
    console.log("[SSH]", cmd);
    const { stdout, stderr } = await ssh.execCommand(cmd, { cwd });

    if (stderr) {
      console.error(`stderr: ${stderr}`);
    } else {
      console.log(`stdout: ${stdout}`);
    }
  }, Promise.resolve());
}

/**
 * uploadBuildDirectory
 * @param {*} ssh
 * @param {*} localDir
 * @param {*} remoteDir
 * @param {*} IGNORES
 * @returns
 */
function uploadBuildDirectory (ssh, localDir, remoteDir, IGNORES) {
  return ssh.putDirectory(localDir + "/", remoteDir, {
    recursive: true,
    concurrency: 10,
    validate: function (itemPath) {
      const baseName = path.basename(itemPath);
      return !IGNORES.includes(baseName);
    },
    tick: function (localPath, remotePath, error) {
      if (error) {
        console.error(`X ${localPath} -> ${remotePath}`);
      } else {
        console.info(`! ${localPath} -> ${remotePath}`);
      }
    },
  });
}

/**
 * build
 * @returns
 */
function build () {
  return new Promise((resolve, reject) => {
    const dir = __dirname;
    const mode = argv.mode || "development";

    const distributionDir = path.join(dir, "build");

    const config = {
      mode,
      entry: {
        index: path.join(dir, "src/index.js"),
      },
      output: {
        path: distributionDir,
        filename: "[name].js",
        libraryTarget: "commonjs2",
        clean: true,
      },
      devtool: false,
      target: "node",
      externals: [
        "electron",
        "aws-sdk",
        "ioredis",
        "bull",
        "tronweb",
        "web3",
        "ethereum-input-data-decoder",
        "ethereumjs-util",
        "moment",
        "redlock",
        "winston",
        "winston-daily-rotate-file",
      ],
      resolve: {
        extensions: [".js", ".jsx", ".json"],
      }
    };

    webpack(config, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

/**
 * deploy
 */
async function deploy () {
  const localDir = __dirname;
  const env = argv.env;
  const remoteDir = `/home/echidna`;

  // read secret
  const secretFile = fs.readFileSync(path.join(__dirname, ".secret"));
  const secret = JSON.parse(secretFile);
  const connectionUrl = secret[env];

  console.log("Building app");
  // argv.mode = env === "prod" ? "production" : "development";
  argv.mode = "development";
  await build();

  // Connect
  console.log("Deploy to", connectionUrl);
  const { ssh, sudoer } = await connectSSH(connectionUrl);

  await sshStreamExec(ssh, "mkdir", ["-p", remoteDir]);

  const IGNORES = [".secret", "node_modules", "webpack.config.js", "gulpfile.js", "src", "logs", "src", "infras"];
  await uploadBuildDirectory(ssh, localDir, remoteDir, IGNORES);

  if (argv.setup) {
    await sshStreamBatch(ssh, [
      [`chown -R ${sudoer}:${sudoer} ${remoteDir}/`, remoteDir],
      [`sudo su -s /bin/sh ${sudoer} -c "pm2 stop all"`, remoteDir],
      [`sudo su -s /bin/sh ${sudoer} -c "npm install --production --omit=dev --only=prod"`, remoteDir],
      [`sudo su -s /bin/sh ${sudoer} -c "pm2 start pm2-${env}.json --env ${env}"`, `${remoteDir}/scripts`],
      [`sudo su -s /bin/sh ${sudoer} -c "pm2 save"`]
    ]);
  } else {
    await sshStreamBatch(ssh, [
      [`sudo su -s /bin/sh ${sudoer} -c "pm2 restart all"`, remoteDir]
    ]);
  }

  ssh.dispose();
}

function execAsync (executable, args, options) {
  return new Promise(async (resolve, reject) => {
    const ENV_PATHS = process.env.PATH.split(";");
    let execPath;
    for (const envPath of ENV_PATHS) {
      execPath = path.join(envPath, executable);
      try {
        await fs.promises.access(execPath, fs.constants.F_OK);
        break;
      } catch (ex) {
      }
    }

    const cp = child_process.spawn(execPath, args, { ...options, stdio: ["inherit", "pipe", "inherit"] });

    cp.stdout.on('data', (data) => {
      console.log(`> ${data}`);
    });

    cp.on('error', (data) => {
      console.error(`! ${data}`);
      reject(data);
    });

    cp.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      resolve(code);
    });
  })
}

async function terraform () {
  let terraformCommand = "init";
  if (argv.plan) {
    terraformCommand = "plan";
  }
  if (argv.apply) {
    terraformCommand = "apply";
  }
  await execAsync("terraform.exe", [terraformCommand], {
    cwd: path.join(__dirname, `infras/terraform/${argv.env}`)
  });
}

/**
 * TASKS
 */
exports.build = build;
exports.deploy = deploy;
exports.terraform = terraform;
