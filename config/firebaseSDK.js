import firebase from 'firebase';
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  MESSAGE_SENDER_ID,
  STORAGE_BUCKET,
} from 'react-native-dotenv'

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        databaseURL: DATABASE_URL,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGE_SENDER_ID,
      });
    }
  }
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;