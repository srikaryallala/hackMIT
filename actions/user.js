import Firebase, { db } from '../config/Firebase.js'
import firebase from 'firebase'

// define types
export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_FIRSTNAME = 'UPDATE_FIRSTNAME'
export const UPDATE_LASTNAME = 'UPDATE_LASTNAME'
export const UPDATE_LOCATION = 'UPDATE_LOCATION'
export const UPDATE_USERNAME = 'UPDATE_USERNAME'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SIGNUP = 'SIGNUP'
export const GET_USER_CHATS = 'GET_USER_CHATS'

// actions
export const updateFirstName = firstName => {
  return {
    type: UPDATE_FIRSTNAME,
    payload: firstName
  }
}
export const updateLastName = lastName => {
  return {
    type: UPDATE_LASTNAME,
    payload: lastName
  }
}
export const updateUsername = username => {
  return {
    type: UPDATE_USERNAME,
    payload: username
  }
}
export const updateEmail = email => {
  return {
    type: UPDATE_EMAIL,
    payload: email
  }
}

export const updatePassword = password => {
  return {
    type: UPDATE_PASSWORD,
    payload: password
  }
}

export const updateLocation = location => {
  return {
    type: UPDATE_LOCATION,
    payload: location
  }
}

export const login = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user
      const response = await Firebase.auth().signInWithEmailAndPassword(email, password)
      dispatch(getUser(response.user.uid))
    } catch (e) {
      alert(e)
    }
  }
}

export const logout = () => {
  return async (dispatch, getState) => {
    try {
      const { username, firstName, lastName, email, password } = getState().user
      const response = await Firebase.auth().signOut()
    } catch (e) {
      alert(e)
    }
  }
}

export const getUser = uid => {
  return async (dispatch, getState) => {
    try {
      const user = await db.collection('users').doc(uid).get()

      dispatch({ type: LOGIN, payload: user.data(), uid: uid});
    } catch (e) {
      alert(e)
    }
  }
}

export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const { username, firstName, lastName, email, password } = getState().user

      const response = await Firebase.auth().createUserWithEmailAndPassword(email, password)
      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          listings: [],
        }

        db.collection("users").doc(response.user.uid).set(user)

        dispatch({ type: SIGNUP, payload: user })
      }
    } catch (e) {
      alert(e)
    }
  }
}


export const getUserChats = (uid) => {
  return async (dispatch, getState)=> {
    try {
      const chatRef = db.collection('chats');
      let chats = []
      const isBuyer = await chatRef.where('buyer', '==', uid).get()
      .then((chatRef) => {
        chatRef.forEach((chat) => {
          let uid = chat.id;
          chats.push(uid)
        })
      });
      const isSeller = await chatRef.where('seller', '==', uid).get()
      .then((chatRef) => {
        chatRef.forEach((chat) => {
          let uid = chat.id;
          chats.push(uid)
        })
      });
      // console.log(chats)

      /* get the data of the chatRoom */
      let chatRooms = [];

      for(const chat of chats) {
        await db.collection('chats').doc(chat).get()
        .then(async (querySnapshot) => {
          let data = await querySnapshot.data();
          await chatRooms.push(data);
        })
      }

      /* TODO: parse the data of the chatRoom into individual users' data
      * dilemma is that we need the seller uid to be saved too! */

      // let roomInfo = [];
      //
      // for(const room of chatRooms) {
      //   await db.collection('users').doc(room.buyer).get()
      //   .then(async (querySnapshot) => {
      //     let data = querySnapshot.data();
      //     roomInfo.push(data);
      //   })
      // }
      //
      // console.log(roomInfo)
      // await db.collection('chats').get()
      // .then((chatRef) => {
      //   chatRef.forEach((chat) => {
      //     let { buyer, itemID, messages, seller } = chat.data();
      //     chatRooms.push({buyer, itemID, messages, seller})
      //   })
      // })
      // console.log(chatRooms)
      dispatch({ type: GET_USER_CHATS, payload: chats})
    }
    catch(e){
      alert (e);
    }
  }
}
