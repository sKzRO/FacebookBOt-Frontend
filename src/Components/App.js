import React, {Component} from 'react';
import firebase from "firebase"
import Main from './Main'
import Navigation from './Navigation'
import AboutUs from './AboutUs'
import Footer from './Footer'
import SignIn from './SignIn'
import Firebase from 'firebase'


firebase.initializeApp({
  apiKey: "AIzaSyAhndV4fRgIsRKYuSJWoSgylRIUnR6G8Dg",
  authDomain:"facebookwarninguh.firebaseapp.com",
  databaseURL: "https://facebookwarninguh.firebaseio.com/"
})


class App extends Component{
  state = {
    isSignedIn: false,
    message: 'Basic message',
    status: false,
    activation_token: '',
    activated: false
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions : [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/message`).once("value", snapshot => {
          if (!snapshot.exists()){
            Firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).set(this.state);
           // console.log('DATA SAVED');//write to firebase   
            let param = firebase.auth().currentUser.uid;//atentionezi backend-u
            this.postServer(`https://us-central1-facebookwarninguh.cloudfunctions.net/app/user/${firebase.auth().currentUser.uid}/activate`,param);   
           }
       });

       // console.log("You are signed in!");
        return true;
      },
    }
  }
  

  componentDidMount () {

    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn : !!user})
    })
  }

  postServer = async (url, param) => {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(param)
    });
    let myObj = await response.json();
    this.setState({ activation_token: myObj.activation_token });
    Firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).set(this.state);

  }

  render () {
    return (
      <div className="App">
        <Navigation />
        {this.state.isSignedIn ? (
        <Main config={this.uiConfig}/>
        ) : (
          <SignIn uiConfig={this.uiConfig}/>
        )}
      <AboutUs />
      <Footer />


      </div>
    )
  }
  
}

export default App;
