export function debounce(timerRef: any, callback: Function, time: number = 500) {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
        // @ts-ignore
        callback.apply(this, arguments);
    }, time);
}
