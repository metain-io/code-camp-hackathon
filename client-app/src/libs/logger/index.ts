let ENABLED_LOG: boolean = process.env.NEXT_PUBLIC_DEBUG == 'true';
let LOG_LEVELS: string[] = ['error', 'info', 'debug'];

if (typeof window !== 'undefined') {
    if (!(window as any)?.logger) {
        (window as any).logger = {
            setEnableLog: (enable: boolean) => {
                ENABLED_LOG = enable;
            },
            setLogLevels: (levels: string[]) => {
                LOG_LEVELS = levels;
            },
        };
    }
}

function show(...args: any) {
    if (ENABLED_LOG) {
        console.log(...args);
    }
}

function error(...args: any) {
    if (LOG_LEVELS.includes('error')) {
        show('[ERROR]', ...args);
    }
}

function warning(...args: any) {
    if (LOG_LEVELS.includes('warning')) {
        show('[WARNING]', ...args);
    }
}

function debug(...args: any) {
    if (LOG_LEVELS.includes('debug')) {
        show('[DEBUG]', ...args);
    }
}

function info(...args: any) {
    if (LOG_LEVELS.includes('info')) {
        show('[INFO]', ...args);
    }
}

const logger = {
    error,
    warning,
    debug,
    info,
};

export default logger;
