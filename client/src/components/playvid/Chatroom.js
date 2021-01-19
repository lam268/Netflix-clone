import React, { Component } from "react";
import styled from "styled-components";
import Hls from "hls.js";
import { Container, Row, Col } from "react-bootstrap";
import io from "socket.io-client";
const socket = io("http://localhost:6000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

const roomName = window.localStorage.room;


export default class Chatroom extends Component {
    handleMessage(e) {
      e.preventDefault();
      const message = e.target.value;
      socket.emit("send-chat-message", window.localStorage.roomId, message);
    }

    handlepause(e) {
      const message = `want to pause`;
      socket.emit("send-pause-message", window.localStorage.roomId, message);
    }

  UNSAFE_componentWillMount() {
    const name = window.localStorage.getItem("name");
    socket.on('room-created', room => {
        window.localStorage.room = room
        var roomName = room
        socket.emit('new-user', roomName, name)
      })
    const email = window.localStorage.getItem("email");
    if (email === null) {
      window.location.href = "/login";
    }
  }
  constructor(props) {
    super(props);
    this._onTouchInsidePlayer = this._onTouchInsidePlayer.bind(this);
  }

  UNSAFE_componentDidMount() {

    this.socket.on("chat-message", (data) => {
      appendMessage(`${data.name}: ${data.message}`);
    });

    this.socket.on("user-connected", (name) => {
      appendMessage(`${name} connected`);
    });

    this.socket.on("user-disconnected", (name) => {
      appendMessage(`${name} disconnected`);
    });

    const liveChannel = "quanle";
    console.log("component did mount");
    if (Hls.isSupported() && this.player) {
      const streamURL = `http://localhost:3002/live/${liveChannel}/index.m3u8`;
      const video = this.player;
      const hls = new Hls();
      hls.loadSource(streamURL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    }
  }
  _onTouchInsidePlayer() {
    if (this.player.paused) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }
  render() {
    // const style1 = {
    //   width: "30%",
    //   height: "100%",
    //   background: "#000",
    // };
    // const style2 = {
    //   width: "70%",
    //   height: "100%",
    //   margin: "0",
    // };
    const style = {
        width : '100%',
        height : '100%',
        background : '#000',
    }
    return (
            <PlayerWrapper>
              <PlayerContent>
                <video
                  controls={true}
                  ref={(player) => (this.player = player)}
                  autoPlay={true}
                  muted={true}
                ></video>
              </PlayerContent>
            </PlayerWrapper>
          /* <Col style={style1}>
            <div id="message-container"></div>
            <form id="send-container">
              <input type="text" id="message-input"></input>
              <button onSubmit={(e) => this.handleMessage(e)}>Send</button>
              <button onClick={(e) => this.handlepause(e)}>Pause</button>
            </form>
          </Col> */
    );
  }
}

const PlayerWrapper = styled.div`
position : relative ;`;
const PlayerContent = styled.div``;
