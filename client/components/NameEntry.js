import React, { Component } from 'react';
import store, { createNewMessage,receivedNewMessage, postMessage, addAuthor } from '../store';

export default class NameEntry extends Component {
  constructor (props) {
    super(props);
    this.state = store.getState();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    this.unsubscribeFromStore = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromStore();
  }

  handleChange(event) {
    store.dispatch(addAuthor(event.target.value))
  }

  render () {
    return (
        <form className="form-inline">
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
          onChange={this.handleChange}
        />
      </form>      
    );
  }
}
