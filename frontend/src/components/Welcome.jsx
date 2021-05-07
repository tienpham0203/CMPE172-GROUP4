import React, { Component } from "react";

import { Link } from 'react-router-dom'
class Welcome extends Component{
    render(){
        return(
            <>
            
            <div className="container">
               <h1 >welcome to Be My speaker</h1>
              <h3>Click here to go to MP3 player</h3>
              <Link to="/welcome/result">HERE</Link>
            </div>
            </>
        )
    }
}
export default Welcome