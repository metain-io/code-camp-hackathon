export async function resolvePromise<T>(promise: Promise<T>): Promise<[T | null, any]> {
    try {
        const result: T = await promise;

        return [result, null];
    } catch (resolvePromiseError) {
        return [null, resolvePromiseError];
    }
}
