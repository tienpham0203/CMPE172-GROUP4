import S3 from 'react-aws-s3';
import React, { Component } from "react";
import AudioPlayer from 'react-h5-audio-player';
import AWS from 'aws-sdk';
import { Readable } from "stream";
const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
}
const ReactS3Client = new S3(config)

const polly = new AWS.Polly(config);


class UpLoadToS33 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            url: "https://tien-bucket-1.s3-us-west-1.amazonaws.com/test3.mp3"
        }
    }

    handleClicked() {

    }

     bufferToBase64 =(buf)=> {
        var binstr = Array.prototype.map.call(buf, function (ch) {
            return String.fromCharCode(ch);
        }).join('');
        return btoa(binstr);
    }


    upload = async (e) => {

        e.preventDefault();
        const reader = new FileReader();
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
                    const base64 = this.bufferToBase64(uInt8Array);
                    const arrayBuffer = uInt8Array.buffer;
                    const blob = new Blob([arrayBuffer]);
                    const url = URL.createObjectURL(blob);
                    this.setState({
                        url
                    })

                    

                    ReactS3Client.uploadFile(data.AudioStream, "test4.mp3")
                        .then(data => {
                            console.log("In here");
                            console.log(data);
                            // 
                        })
                        .catch(err => {
                            console.log(err);
                        })

                }
            })

        }

       // reader.readAsText(e.target.files[0]);


    }
    render() {
        const urlLink = this.state.url;
        console.log(urlLink);
        return (
            <div>
                <div>
                    <h3>aws s3 upload</h3>
                    <input
                        type='file'
                        onChange={this.upload}
                    />
                    {/* <Link to={`result?url=${urlLink}`}>Go to Result page</Link> */}
                </div>
                <div className="jumbotron text-center">
                    <h3>Text-to-speech Aws Polly Demo</h3>
                    <AudioPlayer
                        src={"urlLink"}
                        onPlay={e => console.log("onPlay")} />
                </div>

            </div>


        )
    }
}
export default UpLoadToS33



