/* eslint-disable linebreak-style */
import React, {Component} from 'react';
import firebase from 'firebase';
import Main from './Main';
import Navigation from './Navigation';
import AboutUs from './AboutUs';
import SignIn from './SignIn';
import Firebase from 'firebase';
import {APIKEY, AUTHDOMAIN, DATABASEURL} from './config';

firebase.initializeApp({
    apiKey: APIKEY,
    authDomain: AUTHDOMAIN,
    databaseURL: DATABASEURL,
});

class App extends Component {
  state = {
      isSignedIn: false,
      message: 'I work at project X!',
      status: false,
      activated: false,
  }
  uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
          signInSuccessWithAuthResult: () => {
              firebase.database().ref(`users/${firebase.auth().currentUser.uid}/message`).once('value', snapshot => {
                  if (!snapshot.exists()) {
                      Firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).set(this.state);
                      let param = firebase.auth().currentUser.uid;//atentionezi backend-u
                      this.postServer(`https://us-central1-facebookwarninguh.cloudfunctions.net/app/user/${firebase.auth().currentUser.uid}/changed`, param);
                  }
              });
              return true;
          },
      },
  }

  componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
          this.setState({isSignedIn: !!user});
      });
  }

  postServer = async (url, param) => {
      // eslint-disable-next-line no-unused-vars
      const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(param),
      });
      Firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).set(this.state);
  }

  render() {
      return (
          <div className="App">
              <Navigation />
              {this.state.isSignedIn ? (
                  <Main config={this.uiConfig}/>
              ) : (
                  <SignIn uiConfig={this.uiConfig}/>
              )}
              <AboutUs />
          </div>
      );
  }
}

export default App;
