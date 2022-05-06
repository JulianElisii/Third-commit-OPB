export const useSsessionStorage = (key) => {
    const storedValue = sessionStorage.getItem(key)
    if (!storedValue) {
        return false;
    } else {
        return storedValue;
    }
}