import {NativeModules} from 'react-native';

const {Settings} = NativeModules;

if (!Settings) {
  console.error('Settings is undefined. Ensure it is properly linked.');
} else {
  console.log('Settings found:', Settings);
}

const key = 'randomString';

const get = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (Settings) {
      Settings.get(key, (error: any, value: string) => {
        if (error) {
          console.error('Error getting value:', error);
          reject(error);
        } else {
          console.log('Value from native:', value);
          resolve(value as string); // Ensure TypeScript understands the type
        }
      });
    } else {
      console.error('Settings module is unavailable.');
      reject('Settings module is unavailable.');
    }
  });
};

const set = async (randomString: string) => {
  return new Promise<void>((resolve, reject) => {
    if (Settings) {
      Settings.set(key, randomString, (error: any) => {
        if (error) {
          console.error('Error setting value:', error);
          reject(error);
        } else {
          console.log('Successfully set value');
          resolve();
        }
      });
    } else {
      console.error('Settings module is unavailable.');
      reject('Settings module is unavailable.');
    }
  });
};

export {get, set};
