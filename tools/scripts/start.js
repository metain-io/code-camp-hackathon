const ChildProcess = require('child_process');
const Fs = require('fs');
const { DEFAULT_ENVIRONMENT, DISTRIBUTION_DIR } = require('./constants');
const { transformArgvToPayload } = require('./utils');

function main() {
    const { argv } = process;
    const payload = transformArgvToPayload(argv);

    const { '--e': environment = DEFAULT_ENVIRONMENT } = payload;

    try {
        console.log(`\n========== START ${environment.toUpperCase()} ==========\n`);
        const workingDir = `${DISTRIBUTION_DIR}/${environment}`;

        if (!Fs.existsSync(workingDir)) {
            console.log(`No build exported for environment ${environment} found`);
            return;
        }

        ChildProcess.execSync('npx http-server . -p 3000 -c-1', {
            cwd: workingDir,
            stdio: 'inherit',
        });
    } catch (startError) {
        console.log(`\n========== START ${environment.toUpperCase()} FAILED ==========\n`, startError);
    }
}

main();
