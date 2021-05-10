import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './bootstrap.css';
import './app.css';

import UploadToS3 from './components/UploadToS3';
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
         
                
       <Router>
      <>
      <Route path="/" exact component={UploadToS3}/>
    
   
      </>
  </Router>
             
     
      </div>

    );
  }
}

export default App;

