const ChildProcess = require('child_process');
const Fs = require('fs');
const { DEFAULT_ENVIRONMENT, ENV_FILES_DIR } = require('./constants');
const { transformArgvToPayload } = require('./utils');

function main() {
    const { argv } = process;
    const payload = transformArgvToPayload(argv);

    const { '--e': environment = DEFAULT_ENVIRONMENT } = payload;

    try {
        console.log(`\n========== DEVELOP ${environment.toUpperCase()} ==========\n`);

        const srcEnvFilePath = `./${ENV_FILES_DIR}/env.${environment}`;
        const dstEnvFilePath = '.env';

        if (!Fs.existsSync(srcEnvFilePath)) {
            console.log(`Cannot find ${srcEnvFilePath}`);
            return;
        }

        if (Fs.existsSync(dstEnvFilePath)) {
            Fs.rmSync(dstEnvFilePath);
        }

        Fs.copyFileSync(srcEnvFilePath, dstEnvFilePath);

        ChildProcess.execSync('npx next dev', { stdio: 'inherit' });
    } catch (error) {
        console.log(`\n========== DEVELOP ${environment.toUpperCase()} FAILED ==========\n`, error);
    }
}

main();
