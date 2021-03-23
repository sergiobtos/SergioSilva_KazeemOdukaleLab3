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

    const loginData = { auth: { email, password } }

    axios.post(apiUrl, loginData).then(res => {

      localStorage.setItem('email', res.data.screen)

      setScreen(res.data.screen);

    }).catch(error => {

      console.log(error)

    })

  };
  
  const readCookie = () => {

    const auth = localStorage.getItem('email')

    if (auth) {
      setScreen(auth);
    } else {
      setScreen('auth');
    } 

  };


  useEffect(() => {

    readCookie()

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

