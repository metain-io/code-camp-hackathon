export function* resolveGenerator<T>(generator: Generator<T> | Promise<T>) {
    try {
        const result: T = yield generator;

        return [result, null];
    } catch (resolveGeneratorError) {
        return [null, resolveGeneratorError];
    }
}
