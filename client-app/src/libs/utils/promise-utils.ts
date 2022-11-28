export async function resolvePromise<T>(promise: Promise<T>) {
    try {
        const result: T = await promise;

        return [result, null];
    } catch (resolvePromiseError) {
        return [null, resolvePromiseError];
    }
}
