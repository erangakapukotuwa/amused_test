export const addToStorage = (key: string, data: any) => {
    localStorage.setItem(key, data);
};

export const getFromStorage = (key: string) => {
    const data = localStorage.getItem(key);

    if (!data) {
        return null;
    }

    return JSON.parse(data);
};

export const removeFromStorage = (key: string) => {
    localStorage.removeItem(key);
};