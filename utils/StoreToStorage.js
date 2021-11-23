import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeGeneralData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
        console.log(e)
    }
}

export const storeObjectData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(key, value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
        console.log(e)
    }
}

export const getGeneralData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        // error reading value
        console.log(e)
    }
}

export const getObjectData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        console.log(jsonValue)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        console.log(e)
    }
}

export const clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        // clear error
        console.log(e)
    }
}

export const removeFew = async (keys) => {
    try {
        await AsyncStorage.multiRemove(keys)
    } catch (e) {
        // remove error
        console.log(e)
    }
}
