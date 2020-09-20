import { combineReducers } from 'redux'
import { LOGIN, SIGNUP, UPDATE_EMAIL, UPDATE_PASSWORD, UPDATE_FIRSTNAME, UPDATE_LASTNAME, UPDATE_USERNAME, UPDATE_LOCATION,
GET_USER_CHATS } from '../actions/user'
import { UPDATE_ROOMNAME, MAKE_ROOM } from '../actions/chat';

const user = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload
        case SIGNUP:
            return action.payload
        case UPDATE_EMAIL:
            return { ...state, email: action.payload }
        case UPDATE_PASSWORD:
            return { ...state, password: action.payload }
        case UPDATE_FIRSTNAME:
            return { ...state, firstName: action.payload }
        case UPDATE_LASTNAME:
            return { ...state, lastName: action.payload }
        case UPDATE_USERNAME:
            return { ...state, username: action.payload }
        case UPDATE_LOCATION:
            return { ...state, location: action.payload}
        case GET_USER_CHATS:
            return {...state, chats: action.payload}
        default:
            return state
    }
}

const chat = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ROOMNAME:
      return { ...state, roomName: action.payload }
    case MAKE_ROOM:
      return action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
    user, chat
})

export default rootReducer;
