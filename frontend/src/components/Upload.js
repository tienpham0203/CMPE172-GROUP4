import React, { useRef } from "react";
import S3 from "react-aws-s3";
import upload from './upload.css';
import DisplayResult from './DisplayResult.js'
import { Link } from 'react-router-dom'


function Upload() {
  const message = '';
  const fileInput = useRef();
  const handleClick = (event) => {
    event.preventDefault();
    let file = fileInput.current.files[0];
    let newFileName = fileInput.current.files[0].name.replace(/\..+$/, "");
    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    };
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName).then((data) => {
      console.log(data);
      if (data.status === 204) {
       console.log("success")
      } else {
        console.log("fail");
      }
    });
    message = newFileName;
  
  };
 

  return (

        <form className='form1' onSubmit={handleClick}>
      <h1 className="title">Be My Speaker</h1>
      <h3 className="select-label">
          Choose a text file:
          </h3>
          <div className="a1">
          <input type='file' ref={fileInput} />
          </div>
        <br />
        <div className="a2">
        <button className='button' type='submit'>Upload</button>
        <p> {message} </p>
        <div className="sweet-loading">
        <Link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" to="/result">Process text</Link>
        </div>
     
        </div>
      </form>  
           
  );
}


export default Upload;