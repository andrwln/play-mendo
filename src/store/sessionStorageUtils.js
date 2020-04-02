export function setSessionData(key, data) {
    // convert data to json string
    const dataToStore = JSON.stringify(data);
    sessionStorage.setItem(key, dataToStore);
}

export function getSessionData(key) {
    // parse JSON string
    const data = sessionStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    }
}
