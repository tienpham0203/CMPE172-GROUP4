import React, { Component } from 'react';

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
        <FileUpload></FileUpload>

      </div>

    );
  }
}


export default App;


