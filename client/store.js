import { createStore } from 'redux';

// ACTION TYPES
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const CREATE_NEW_MESSAGE = "CREATE_NEW_MESSAGE"
const RECEIVED_NEW_MESSAGE = "RECEIVED_NEW_MESSAGE"

// ACTION CREATORS
export function gotMessagesFromServer(messages) {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages
  };
}

export function createNewMessage(message){
  return {
    type: CREATE_NEW_MESSAGE,
    newMessageEntry: message
  }

}

export function receivedNewMessage(message){
  return{
    type: RECEIVED_NEW_MESSAGE,
    message
  }
}

// INITIAL STATE
const initialState = {
  messages: [],
  newMessageEntry: ''
};

// REDUCER
function reducer(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
       return Object.assign({}, state, { messages: action.messages });
    case CREATE_NEW_MESSAGE:
       return Object.assign({}, state, {newMessageEntry : action.newMessageEntry})
    case RECEIVED_NEW_MESSAGE:
      return Object.assign({}, state, { messages: state.messages.concat(action.message) });
    default:
       return state;
  }
}

// STORE
const store = createStore(reducer);
export default store;















