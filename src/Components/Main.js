import React, {Component} from 'react';
import firebase from 'firebase';
import Firebase from 'firebase';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import '../Assets/Main.css';
import M from 'materialize-css';
import copy from 'copy-to-clipboard';

class Main extends Component {

state = {
    message: 'I work at project X!',
    status: null,
    activation_token: '',
}

componentDidMount() {
    //aici o sa dam retrive la informatiile din database
    this.getUserData();
}

copyTokenToClipboard = () => {
    copy('token ' + this.state.activation_token);
    M.toast({html: 'You copied the token! Please copy in FB APP!'});
}


postServer = async (url, param) => {
    // eslint-disable-next-line no-unused-vars
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(param),
    });
    //  console.log(response.json());
}

messageChange = event => {
    this.setState({message: event.target.value});
    //  console.log(this.state.message);
};

onRefresh = () => {
    this.writeUserData();
    // eslint-disable-next-line no-lone-blocks
    {this.state.status === true ? M.toast({html: `Success! You set a blocker with message: ${this.state.message}`}) : M.toast({html: 'You disable the blocker!'});}
    //   console.log(this.state);
};


  getUserData = () => {
  //   console.log(firebase.auth().currentUser.uid);
      let ref = Firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`);
      //    console.log(ref);
      ref.on('value', snapshot => {
          const state = snapshot.val();
          this.setState(state);
          //     console.log(state)
      });
  //   console.log(this.state);
  }


  writeUserData = () => {
      Firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).set(this.state);
      //   console.log('DATA SAVED');//write to firebase

      let param = firebase.auth().currentUser.uid;//atentionezi backend-u
      this.postServer(`https://us-central1-facebookwarninguh.cloudfunctions.net/app/user/${firebase.auth().currentUser.uid}/changed`, param);
  }


  onReact = () => {
      this.setState({status: !this.state.status});
      //    console.log(this.state.status);
  };

  render() {
      return (
          <div className="container">
              <div className="row">
                  <div className="col s3">
                      <img className="rimg" src={firebase.auth().currentUser.photoURL} alt={firebase.auth().currentUser.displayName}/>
                      <h5>Hello, {firebase.auth().currentUser.displayName}!</h5>
                      <br></br>
                      <button className="waves-effect light-blue lighten-1 btn" onClick={() => {
                          firebase.auth().signOut();
                      }}>Logout</button>
                  </div>
                  <div className="col s9">
                      <div className="refreshForm">
                          <div className="input-field col s12">
                              <p>Please set your warning message bellow!</p>
                              <input
                                  id="message"
                                  type="text"
                                  className="validate"
                                  value={this.state.message}
                                  onChange={this.messageChange}
                              ></input>
                          </div>
                          <p>Please set your warning status bellow!</p>
                          <div className="switch" >
                              <label>
                        Off
                                  <input type="checkbox" onChange={this.onReact} checked={this.state.status || ''} ></input>
                                  <span className="lever" ></span>
                        On
                              </label>
                          </div>
                          <button className="waves-effect light-blue lighten-1 btn" onClick={this.onRefresh}>Apply settings!</button>
                          <button id="copyButton" className="waves-effect purple lighten-1 btn" onClick={this.copyTokenToClipboard}>Copy Token</button>
                          <i><p>*You need to copy the token and paste it in bot chat!</p></i>
                      </div>
                  </div>
              </div>
          </div>
      );
  }
}

export default Main;
