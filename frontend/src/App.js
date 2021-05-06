import React, { Component } from 'react';
import './bootstrap.css';
import './app.css';
import UploadToS3 from './components/UploadToS3';

import FileUpload from './components/file_upload/FileUpload';
class App extends Component {
  render() {
    return (
      <MyComponents></MyComponents>
    );
  }
}


class MyComponents extends Component {
  render() {
    return (
      <div className="MyCoponents">
        <div className="MyCoponents">  
                 <UploadToS3/>      
      </div>

      </div>

    );
  }
}


export default App;


