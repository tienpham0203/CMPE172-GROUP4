import S3 from 'react-aws-s3';
import React, { Component} from "react";
import upload from './upload.css';
import AudioPlayer from 'react-h5-audio-player';
import AWS from 'aws-sdk';
import axios from 'axios';
//import { Readable } from "stream";
const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
}
const ReactS3Client = new S3(config)

const polly = new AWS.Polly(config);


class UploadToS3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            url: "",
            newNameToSave: '',
            message: ""
        }
      this.handleClicked = this.handleClicked.bind(this);
    }

    componentDidMount = () => {
       console.log("COmponent did mount in uploadto s3") ;

    }
    handleClicked(){
        
    }
  
    upload = async (e) => {

        const reader = new FileReader();
        const newName = e.target.files[0].name;

        console.log(newName);
        const url2 ="http://localhost:9000/api/blog/save?url="+newName;
        axios.post(
         url2,{
             timeout: 4000
         }
        ).then(
            res => {
                console.log(res);
            }
        ).catch(
            err => {
                console.log(err.message);
            }
        )
 
        ReactS3Client.uploadFile(e.target.files[0],newName )
        .then(data=>{
            console.log(data)
        })
        
        .catch(err => {
            console.log(err);
        })

        reader.onload = async (e) => {
            const textResult = e.target.result;
            // Create the parameters
            const params = {
                Text: textResult,
                OutputFormat: 'mp3',
                VoiceId: 'Kimberly',
            };
            polly.synthesizeSpeech(params, (err, data) => {
                if (err) {
                    console.log(err);
                }

                if (data.AudioStream instanceof Buffer) {

                    const uInt8Array = new Uint8Array(data.AudioStream);
                    const arrayBuffer = uInt8Array.buffer;
                    const blob = new Blob([arrayBuffer]);
                    const url = URL.createObjectURL(blob);
             
                    this.setState({
                        url
                      
                    })

               

                     // UPLOAD TO BACK
     
                }
            })

        }

        reader.readAsText(e.target.files[0]);


    }
    render() {
        const urlLink = this.state.url;
      //  const myMessage =  this.state.message;
        console.log(urlLink);
        return (
            <div>
                <div>
                    <h1 className='title'>Be My Speaker</h1>
                  <input 
                        type='file'
                        onChange={this.upload}
                    />
                 
                    {/* <Link to={`result?url=${urlLink}`}>Go to Result page</Link> */}
                  </div>
                <div className="jumbotron text-center">
                    <h3>Replay here</h3>
                    <AudioPlayer
                        src={urlLink}
                        onPlay={e => console.log("onPlay")} />
                    
                </div>

            </div>


        )
    }
}

export default UploadToS3

