import React, { Component } from 'react';
import store, { createNewMessage,receivedNewMessage, postMessage } from '../store';
import axios from 'axios';
import socket from '../socket';

export default class NewMessageEntry extends Component {
  constructor (props) {
    super(props);
    this.state = store.getState();
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.unsubscribeFromStore = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromStore();
  }

  handleChange(event){
    store.dispatch(createNewMessage(event.target.value))
  }

  handleSubmit(event){
    event.preventDefault()
    // our message content is on our state, which we're getting from our Redux store
    const content = this.state.newMessageEntry
    // our channelId is available from the props sent by MessagesList, which it receives as props from the Route!
    const channelId = this.props.channelId
    const name = this.state.name
    const message = {content : content, channelId : channelId, name: name}
    console.log(message);
    store.dispatch(postMessage(message));
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.newMessageEntry}
            onChange={this.handleChange}
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
