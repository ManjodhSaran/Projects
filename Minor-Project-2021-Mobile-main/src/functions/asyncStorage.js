
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
        // console.log('Storing key:', key, ", Value: ", value)
        await AsyncStorage.setItem(key, value)
    } catch (err) {
        // console.log("Async Storage Error : ", err)
    }
}


const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value
        }
        // console.log("Getting key value: ", key, ", Value: ", value)
    } catch (err) {
        // console.log("Async Storage Error : ", err)
    }
}

const storeObjectData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
        // console.log("Async Storage Error : ", err)
    }
}



const getObjectData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // console.log("Async Storage Error : ", err)
    }
}

const clearAsyncStorage = async () => {
    AsyncStorage.clear();
}


export { storeData, getData, storeObjectData, getObjectData, clearAsyncStorage }