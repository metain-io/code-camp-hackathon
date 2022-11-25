const transformArgvToPayload = (argv) => {
    const args = argv.slice(2);

    const obj = {};

    for (let i = 0; i < args.length; i += 2) {
        const key = args[i];
        const value = args[i + 1];

        obj[key] = value;
    }

    return obj;
};

module.exports = {
    transformArgvToPayload,
};
