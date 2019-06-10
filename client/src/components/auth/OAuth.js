import React, { Component } from "react";
import { connect } from "react-redux";
import { loginSocketUser } from "../../actions/authActions";

let checkInterval = null;

class OAuth extends Component {
  state = {
    user: {},
    disabled: ""
  };

  popup = null;

  // componentDidMount() {
  //   const { provider, socket } = this.props;

  //   socket.on(provider, data => {
  //     if (this.popup) {
  //       this.popup.close();
  //     }

  //     if (data.token) {
  //       this.props.loginSocketUser(data);
  //     }
  //   });
  // }

  // Routinely checks the popup to re-enable the login button
  // if the user closes the popup without authenticating.
  checkPopup() {
    checkInterval = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(checkInterval);
        this.setState({ disabled: "" });
      }
    }, 1000);
  }

  componentWillUnmount() {
    if (checkInterval) {
      clearInterval(checkInterval);
    }
  }

  // Launches the popup by making a request to the server and then
  // passes along the socket id so it can be used to send back user
  // data to the appropriate socket on the connected client.
  openPopup() {
    const { provider, socket, socketURI } = this.props;
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `${socketURI}/auth/${provider}?socketId=${socket.id}`;

    return window.open(
      url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  }

  // Kicks off the processes of opening the popup on the server and listening
  // to the popup. It also disables the login button so the user can not
  // attempt to login to the provider twice.
  startAuth(e) {
    if (!this.state.disabled) {
      e.preventDefault();
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({ disabled: "disabled" });
    }
  }

  closeCard() {
    this.setState({ user: {} });
  }

  // custom methods to follow
  // render method to follow
  render() {
    const { provider } = this.props;

    return (
      <li>
        <a href="/" onClick={this.startAuth.bind(this)}>
          <img
            src={`http://dvlalr3x7qof4.cloudfront.net/images/${provider}.svg`}
            alt=""
          />
          <span>{provider}</span>
        </a>
      </li>
    );
  }
}

const mapStateToProps = state => ({
  socket: state.auth.socket,
  socketURI: state.auth.socketURI
});

export default connect(
  mapStateToProps,
  { loginSocketUser }
)(OAuth);
