import {NativeModules, NativeEventEmitter} from 'react-native';

const {SendEventsModule} = NativeModules;

if (!SendEventsModule) {
  console.error('SendEventsModule is undefined. Ensure it is properly linked.');
} else {
  console.log('SendEventsModule found:', SendEventsModule);
}

const eventEmitter = SendEventsModule
  ? new NativeEventEmitter(SendEventsModule)
  : null;

const subscribeToNativeEvent = (callback: {
  (data: any): void;
  (event: any): void;
}) => {
  if (!eventEmitter) {
    console.warn('NativeEventEmitter is not available.');
    return () => {};
  }

  const subscription = eventEmitter.addListener('fromNative', callback);
  return () => subscription.remove();
};

const sendEventsToNative = (randomString: string) => {
  if (SendEventsModule) {
    SendEventsModule.toNative(randomString);
  } else {
    console.error('SendEventsModule is unavailable.');
  }
};

export {subscribeToNativeEvent, sendEventsToNative};
