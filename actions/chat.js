import Firebase, { db } from '../config/Firebase.js'
import firebase from 'firebase'
import 'firebase/firestore';

// define types
export const UPDATE_ROOMNAME = 'UPDATE_ROOMNAME'
export const MAKE_ROOM = 'MAKE_ROOM'

// actions
export const setRoomName = roomName => {
  return {
    type: UPDATE_ROOMNAME,
    payload: roomName,
  }
}

export const fetchRoom = (roomName, buyerID, sellerID) => {
  return async (dispatch, getState) => {
    try {
      const usersRef = await db.collection('users').doc(buyerID);
      const chatRoom = {
        buyer: buyerID,
        seller: sellerID,
        messages: [],
      }
      db.collection('chats').add(chatRoom);
      dispatch({ type: MAKE_ROOM, payload: chatRoom })
      alert("New room made!")
    }
    catch (e) {
      alert(e);
    }
  }
}

// get chat information
export const getChat = (chatID) => {
  return async (disatch, getState) => {
    try {
      let chat = await db.collection('chats').doc(chatID).get();
      console.log("getting chats!")
    }
    catch(e) {
      alert(e)
    }
  }
}
