import React, {Component} from 'react';
import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class SignIn extends Component{


  
  render () {
    return (
        <div className="section no-pad-bot" id="index-banner">
        <div className="container">
          <br></br>
          <h1 className="header center orange-text">Hello stranger!</h1>
          <div className="row center">
            <h5 className="header col s12 light">Welcome to the first automated boot configuration platform that helps you do your job instead of staying on Facebook!
  </h5>
          </div>
          <div className="center">
          <StyledFirebaseAuth
                          uiConfig = {this.props.uiConfig}
                          firebaseAuth={firebase.auth()}
                          />
          </div>
          <br></br>
    
        </div>
      </div>
     
    )
  }
  
}

export default SignIn;
