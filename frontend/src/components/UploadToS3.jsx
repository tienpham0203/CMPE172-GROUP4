import S3 from 'react-aws-s3';
import React, { Component } from "react";


const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  }
  const ReactS3Client = new S3(config)
  
class UploadToS3 extends Component{
  
    upload(e){    
        ReactS3Client.uploadFile(e.target.files[0], "textFile")
        .then(data=>{
            console.log(data)
        })
        .catch(err=>{
            alert(err)
        })
    }
    render(){
        return(
            <div>
                <h3>aws s3 upload</h3>
                <input 
                    type='file'
                    onChange={this.upload}
                />
            </div>
        )
    }
}
export default UploadToS3