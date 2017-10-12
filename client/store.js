import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

const middleware = applyMiddleware(loggerMiddleware, thunkMiddleware);

// ACTION TYPES
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const CREATE_NEW_MESSAGE = "CREATE_NEW_MESSAGE"
const RECEIVED_NEW_MESSAGE = "RECEIVED_NEW_MESSAGE"
const ADD_AUTHOR = "ADD_AUTHOR"

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

export function addAuthor(name) {
  return {
    type: ADD_AUTHOR,
    name
  }
}

export function fetchMessages() {
  return function thunk(dispatch) {
    axios.get('/api/messages')
    .then(res => res.data)
    .then(messages => {
      const action = gotMessagesFromServer(messages);
      dispatch(action);
    });
  }
}

export function postMessage(message) {
  return function thunk(dispatch) {
    axios.post('/api/messages/', message)
    .then(res => res.data)
    .then(message => {
      dispatch(receivedNewMessage(message));
      socket.emit('new-message', message)
    })
  }
}

// INITIAL STATE
const initialState = {
  messages: [],
  newMessageEntry: '',
  name: ''
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
    case ADD_AUTHOR:
      return Object.assign({}, state, {name: action.name})
    default:
       return state;
  }
}

// STORE
const store = createStore(reducer, middleware);
export default store;