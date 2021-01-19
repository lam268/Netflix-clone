import React, { Component } from "react";
import styled from "styled-components";
import Hls from "hls.js";
const PlayerWrapper = styled.div`
  position: relative;
`;
const PlayerContent = styled.div``;

export default class Chatroom extends Component {

  UNSAFE_componentWillMount() {
    
    const email = window.localStorage.getItem('email');
    console.log(email)
    if (email === null) {
        window.location.href = '/login'
    }
  }

  constructor(props) {
    super(props);
    this._onTouchInsidePlayer = this._onTouchInsidePlayer.bind(this);
  }
  componentDidMount() {
    const liveChannel = "quanle";
    if (Hls.isSupported() && this.player) {
      const streamURL = `http://localhost:8000/live/${liveChannel}/index.m3u8`;
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
      width: "70%",
      height: "100%",
      background: "#000",
    };
    return (
      <PlayerWrapper>
        <PlayerContent>
          <video
            controls={true}
            style={style}
            ref={(player) => (this.player = player)}
            autoPlay={true}
            muted={true}
          ></video>
        </PlayerContent>
      </PlayerWrapper>
    );
  }
}
