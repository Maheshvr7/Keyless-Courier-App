import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key: string, value: any) => {
  try {
    const stringifiedValue = convertToStorageType(value);
    await AsyncStorage.setItem(key, stringifiedValue);
  } catch (error) {
    console.error('There was a problem saving data to async storage: ', error.message);
  }
};

export const convertToStorageType = (value: any) => {
  let stringifiedValue 
  if (typeof value !== 'string') {
    stringifiedValue = JSON.stringify(value);
  } else {
    stringifiedValue = value;
  }
  return stringifiedValue;
};

export const convertFromStorageType = (value: string | null) => {
  if (value) {
    // We have data!!
    // Attempt to parse as JSON
    try {
      return JSON.parse(value);
    } catch (error) {
      // If fails json parse and is a string still, return raw string instead
      if (error instanceof SyntaxError && typeof value === 'string') {
        return value;
      }
      console.error('There was a problem fetching data : ', error.message);
      return null;
    }
  }
  return null;
};

/**
 * Get stored data
 * @param key string used to retrieve stored item
 * @returns stored value on success or if key doesn't exist returns null
 */
export const getData = async (key: string): Promise<any> => {
  let value: string | null;
  try {
    value = await AsyncStorage.getItem(key);
    return convertFromStorageType(value);
  } catch (error) {
    console.error('There was a problem fetching data from async storage: ', error.message);
    return null;
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('There was a problem removing data from async storage: ', error.message);
  }
};

export const multiRemove = async (key : string[] ): Promise<void> =>{
  try{    
    return await AsyncStorage.multiRemove(key);
  }catch(error){
    console.error('There was a problem removing multiple data from async storage: ', error.message);
  }
}

export const clearAllData = () => {
  AsyncStorage.clear();
};
