const ChildProcess = require('child_process');
const Fs = require('fs');
const { DEFAULT_ENVIRONMENT, ENV_FILES_DIR, DISTRIBUTION_DIR } = require('./constants');
const { transformArgvToPayload } = require('./utils');

function main() {
    const { argv } = process;
    const payload = transformArgvToPayload(argv);

    const { '--e': environment = DEFAULT_ENVIRONMENT } = payload;

    try {
        console.log(`\n========== BUILD ${environment.toUpperCase()} ==========\n`);

        const srcEnvFilePath = `./${ENV_FILES_DIR}/env.${environment}`;
        const dstEnvFilePath = '.env';

        if (!Fs.existsSync(srcEnvFilePath)) {
            throw new Error(`Cannot find ${srcEnvFilePath}`);
        }

        if (Fs.existsSync(dstEnvFilePath)) {
            Fs.rmSync(dstEnvFilePath);
        }

        Fs.copyFileSync(srcEnvFilePath, dstEnvFilePath);

        ChildProcess.execSync('npx next build', { stdio: 'inherit' });
        ChildProcess.execSync(`npx next export -o ${DISTRIBUTION_DIR}/${environment}`, {
            stdio: 'inherit',
        });

        console.log(`\n========== BUILD ${environment.toUpperCase()} SUCCESSFUL ==========\n`);
    } catch (error) {
        console.log(`\n========== BUILD ${environment.toUpperCase()} FAILED ==========\n`, error);
    }
}

main();
