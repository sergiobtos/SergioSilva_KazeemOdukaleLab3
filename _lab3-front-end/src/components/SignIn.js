import React, { useState, useEffect } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import View from './View';
import { withRouter } from 'react-router-dom';

function SignIn() {

  const styles = {
    color: "red",
    background: "#0f0",
    fontSize: "32px"
  };
  const [screen, setScreen] = useState('auth');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [status, setStatus] = useState();
  const [message, setMessage] = useState();
  const apiUrl = "http://localhost:3000/signin";

  const auth = async () => {
    console.log('calling auth from the front end');
    console.log(email);
    try {
      const loginData = { auth: { email, password } }
      const res = await axios.post(apiUrl, loginData);
      console.log("Line 28 Displaying response from login: "+ res.data.auth);
      console.log("Line 29 of auth method = "+ res.data.screen);
      console.log(res.data.screen !== undefined);
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }else{
        setMessage(res.data.message);
        setStatus(res.data.status);
      }
    } catch (e) { 
      console.log(e);
    }
  
  };
  
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');
      //
      const res = await axios.get('/read_cookie');
      console.log("Response of readCookie: " +JSON.stringify(res)) ;
      console.log(res.data.screen !== undefined);
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log("Line 51: "+res.data.screen)
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };
  useEffect(() => {
    readCookie().then(res=>console.log("UseEffect response: "+res));
  }, []);
  
  return (
    <div className="App">
      {screen === 'auth'?
      <div>
          <label>Email: </label>
          <br/>
          <input type="text" onChange={e => setEmail(e.target.value)} />
          <br/>
          <label>Password: </label>
          <br/>
          <input type="password" onChange={e => setPassword(e.target.value)} />
          <br/>
          { 
            (() => {
              if(status === 'error') {
                return (<div><h2 style={styles}> { message } </h2></div>);
              }
              })()
          }
          <button onClick={auth}>Login</button>
        </div>
         : 
        <View screen={screen} setScreen={setScreen} />
        }
    </div>
  );
}

export default withRouter(SignIn);

