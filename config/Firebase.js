import firebase from 'firebase';
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  MESSAGE_SENDER_ID,
  STORAGE_BUCKET,
  APP_ID,
  MEASUREMENT_ID,
} from 'react-native-dotenv'
import 'firebase/firestore'

// Initialize Firebase
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

let Firebase = firebase.initializeApp(firebaseConfig);

login = async (user, success_callback, failed_callback) => {
  await firebase
  .auth()
  .signInWithEmailAndPassword(user.email, user.password)
  .then(success_callback, failed_callback);
};

export const db = firebase.firestore();
export const realtime = firebase.database();

export default Firebase;
