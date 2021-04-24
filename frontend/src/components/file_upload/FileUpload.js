import React from 'react'
import axios, { post } from 'axios';
import fileUpload from './fileUpload.css'



class FileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }
 
  fileUpload(file){
    const url = 'http://example.com/file-upload';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }

  render() {
    return (
      <form className="form1" onSubmit={this.onFormSubmit}>
        <h1 className="title">Be My Speaker</h1>
        <h3 className="select-label">Choose a text file</h3>
        <div className="a1">
           <input type="file" onChange={this.onChange} />
           </div>
          <div className="a2">
           <button className="button" type="submit">Upload</button>
        </div>
      </form>
   )
  }
}



export default FileUpload;