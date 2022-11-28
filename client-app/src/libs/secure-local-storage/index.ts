import CryptoJS from 'crypto-js';

const ENABLE_ENCODE_KEY = process.env.NEXT_PUBLIC_DEBUG != 'true';
const ENCRYPT_KEY = process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_ENCRYPT_KEY || 'NEXT_PUBLIC_ENCRYPT_KEY!@#$%^';

async function encryptValue(value: string): Promise<string> {
    const encryptedValue = CryptoJS.AES.encrypt(value, ENCRYPT_KEY).toString();
    return encryptedValue;
}

async function decryptValue(encryptedValue: string): Promise<string> {
    const value = CryptoJS.AES.decrypt(encryptedValue, ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
    return value;
}

function encodeKey(key: string) {
    return ENABLE_ENCODE_KEY ? Buffer.from(key).toString('base64') : key;
}

async function setItem(key: string, value: string): Promise<void> {
    const encryptedValue = await encryptValue(value);
    localStorage.setItem(encodeKey(key), encryptedValue);
}

async function getItem(key: string, fallback: any = null): Promise<any> {
    const value = localStorage.getItem(encodeKey(key));

    if (!value) {
        return fallback;
    }

    const decryptedValue = await decryptValue(value);
    return decryptedValue;
}

async function removeItem(key: string): Promise<void> {
    localStorage.removeItem(encodeKey(key));
}

async function clearAll(): Promise<void> {
    localStorage.clear();
}

const secureLocalStorage = {
    setItem,
    getItem,
    removeItem,
    clearAll,
};

export default secureLocalStorage;
