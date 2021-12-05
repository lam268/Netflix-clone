import React,{Component} from 'react'
import styled from 'styled-components'
import Hls from 'hls.js'
import vid from '../images/video1.mp4'

const PlayerWrapper = styled.div`
    position : relative ;
`
const PlayerContent = styled.div`
`;
export default class Vod extends Component{
    constructor(props){
        super(props);
        this._onTouchInsidePlayer=this._onTouchInsidePlayer.bind(this);
    }
    componentDidMount(){
        console.log('component did mount');
        if(Hls.isSupported() && this.player) {
            const streamURL = `https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8`;
            try {
                console.log(vid);
                const video = this.player;
                const hls = new Hls();
                hls.loadSource(streamURL);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED,function() {
                    video.play();
                });
            } catch (error) {
                console.log(Error)
            }
            
        }
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
        const style = {
            width : '100%',
            height : '100%',
            background : '#000',
        }
        return <PlayerWrapper>
            <PlayerContent>
                <video controls={true} src="/Users/long/Downloads/video1.mp4" type="video/mp4"  style={style} ref={(player) => this.player=player} autoPlay={true} muted={true}></video> 
            </PlayerContent>
            
        </PlayerWrapper>
    }
}