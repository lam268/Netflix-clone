import React,{Component} from 'react'
import styled from 'styled-components'
import VideoPlayer from 'react-video-js-player'

const PlayerWrapper = styled.div`
    position : relative ;
`
const PlayerContent = styled.div`
`
export default class Vod extends Component{
    constructor(props){
        super(props);
        this._onTouchInsidePlayer=this._onTouchInsidePlayer.bind(this);
    }
    componentDidMount(){
    }
    _onTouchInsidePlayer(){
        if (this.player.paused){
            this.player.play();
        } 
        else {
            this.player.pause();
        }
    }
    render(){
        const videoSrc = "http://localhost:3003/hls/index.m3u8";
        
        return <PlayerWrapper>
            <PlayerContent >
                <VideoPlayer width='100%' height='100%' src={videoSrc} type="application/x-mpegURL"/>
            </PlayerContent>
            
        </PlayerWrapper>
    }
}