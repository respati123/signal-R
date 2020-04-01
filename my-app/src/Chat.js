import React, { Component } from 'react';
import * as signalR   from '@aspnet/signalr';

class Chat extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        message: '',
        messages: [],
        hubConnection: null,
      };
    }
  
    componentDidMount = () => {
      localStorage.setItem('conectionId', null);
  
      const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/ChatHub')
      .configureLogging(signalR.LogLevel.Trace)
      .build();
  
      this.setState({ hubConnection}, () => {
        let thos = this;
        this.state.hubConnection
          .start()
          .then(function () {
            console.log("connected");
            thos.state.hubConnection.invoke('getConnectionId')
                .then(function (connectionId) {
                    localStorage.setItem('conectionId', connectionId);
                }).catch(err => console.log('Error while establishing connection :('+err));
        });


        this.state.hubConnection.on('ReceiveMessage', (receivedMessage) => {
          const messages = this.state.messages.concat([receivedMessage]);
          this.setState({ messages });
        });
      });
    };
  
    sendMessage = () => {
      this.state.hubConnection
        .invoke('Send', localStorage.getItem('conectionId'))
        .catch(err => console.error(err));
  
        this.setState({message: ''});      
    };
  
    render() {
      return (
        <div>
          <br />
          <input
            type="text"
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
          />
  
          <button onClick={this.sendMessage}>Send</button>
  
          <div>
            {this.state.messages.map((message, index) => (
              <span style={{display: 'block'}} key={index}> {message} </span>
            ))}
          </div>
        </div>
      );
    }
  }
  
  export default Chat;