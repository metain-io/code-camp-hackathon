export function* resolveGenerator<T>(
    generator: Generator | Promise<T>,
): Generator<[T | null, any]> | Promise<[T | null, any]> {
    try {
        const result: T = yield generator;

        return [result, null];
    } catch (resolveGeneratorError) {
        return [null, resolveGeneratorError];
    }
}
