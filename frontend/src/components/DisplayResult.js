import React, { Component } from 'react'
import AudioPlayer from 'react-h5-audio-player';



class DisplayResult extends Component {
  constructor(props){
    super(props);
    this.state = {
      url : ""
    }
  }




  render() {    
    return (
      <div>
      <div className="jumbotron text-center">
        <h3>Text-to-speech Aws Polly Demo</h3>
         <AudioPlayer 
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          onPlay={e => console.log("onPlay")} />
      </div>
     
      </div>
    );
  }
}


export default DisplayResult