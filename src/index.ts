import { Dimensions, EmitterSubscription, NativeEventEmitter, NativeModules } from 'react-native';
const { RNSimpleCompass } = NativeModules;

let nextId = 1;

let listeners: [{id: number, removeListener: EmitterSubscription}] = [];

export const SimpleCompass = {
  start(threshold: number = 0, callback: (heading: { degree: number; accuracy: number }) => void) {
    const compassEventEmitter = new NativeEventEmitter(RNSimpleCompass);
    
    const thisId = nextId;
    nextId++;
    
    listener = compassEventEmitter.addListener('HeadingUpdated', course => {
      const correctedCourse = { ...course };
      const { height, width } = Dimensions.get('window');
      if (width > height) {
        correctedCourse.degree += 90;
      }
      callback(correctedCourse);
    });

    RNSimpleCompass.start(threshold);

    const listenerObj = {id: thisId, removeListener: () => {
      listener.remove();
      listeners = listeners.filter(l => l.id !== thisId)
    }};

    listeners.push(listenerObj);

    return listenerObj;
  },

  stop() {    
    listeners.forEach(l => {
      l.removeListener();
    });

    listeners = [];
    RNSimpleCompass.stop();
  },
};

export default SimpleCompass;
