import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoggedIn from "./LoggedIn/LoggedIn";

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

const firebaseConfig = {
  apiKey: "AIzaSyAaqSsojk5bWEnQqcZqtykvxxTb4PZFkY0",
  authDomain: "pantheon-kym.firebaseapp.com",
  databaseURL: "https://pantheon-kym.firebaseio.com",
  projectId: "pantheon-kym",
  storageBucket: "pantheon-kym.appspot.com",
  messagingSenderId: "171659779939",
  appId: "1:171659779939:web:2610fc8c1b0d8beb62fd56",
  measurementId: "G-4L83D99ZZY"
};

firebase.initializeApp(firebaseConfig);

function App() {
  useEffect(()=>{
    console.log(`firebase react app set up`);
  })
  return (
    <div className="App">
      <h2>Know your mythology</h2>
      <h3>Flash card web app to learn the names of mythological deities</h3>
      <Router>
        <Switch>
          <Route exact path='/signedIn' component={LoggedIn}/>
          <Route path="/" render={props => <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>}/>
        </Switch>
      </Router>

      {/*<div>*/}
      {/*  <h1>My App</h1>*/}
      {/*  <p>Please sign-in:</p>*/}
      {/*  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>*/}
      {/*</div>*/}
    </div>
  );
}

export default App;
