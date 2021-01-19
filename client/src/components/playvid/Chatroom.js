import React, { Component } from "react";
import styled from "styled-components";
import Hls from "hls.js";
import Chat from "../Chat/Chat/Chat";

var getParams = function (string) {
  var params = [];
  params = string.split("/");
  console.log(params);
  return params[params.length-1];
};

export default class Chatroom extends Component {
  UNSAFE_componentWillMount() {
    const email = window.localStorage.getItem("email");
    window.localStorage.setItem("roomId",getParams(window.location.href));
    console.log(window.location.href);
    if (email === null) {
      window.location.href = "/login";
    }
  }
  constructor(props) {
    super(props);
    this._onTouchInsidePlayer = this._onTouchInsidePlayer.bind(this);
  }

  componentDidMount() {
    const liveChannel = "quanle";
    if (Hls.isSupported() && this.player) {
      const streamURL = `http://localhost:8000/live/quanle/index.m3u8`;
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
    const style = {
      width: '100%',
      height: '100%',
      background: '#000',
    }
    return (
      <PlayerWrapper>
        <Column1>
          <PlayerContent>
            <video controls={true} style={style} ref={(player) => this.player = player} autoPlay={true} muted={true}></video>
          </PlayerContent>
        </Column1>
        <Column2>
          <Chat />
        </Column2>
      </PlayerWrapper>
    );
  }
}

const PlayerWrapper = styled.div`
display: flex;
position : relative ;`;
const PlayerContent = styled.div``;
const Column1 = styled.div`
width: 70%;
height: 100vh;
`;
const Column2 = styled.div`
width: 30%;
height: 100vh;
`;