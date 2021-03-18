import React, { useState, useEffect } from 'react';
//import Jumbotron from 'react-bootstrap/Jumbotron';
//import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
import axios from 'axios';
import View from './View';

function App() {

  const [screen, setScreen] = useState('auth');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:5000/signin";

  const auth = async (event) => {
    event.preventDefault();
    try {
      const signinData = { email, password };
      const res = await axios.post(apiUrl, signinData);
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
      }
    } catch (e) {
      console.log(e);
    } 
  };
  
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');

      const res = await axios.get('/read_cookie');

      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        //console.log(res.data.screen)
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };
  useEffect(() => {
    readCookie();
  }, []); 
  return (
    <div className="App">
      {screen === 'auth' 
        ? (<div>
          <label>Email: </label>
          <br/>
          <input type="text" onChange={e => setEmail(e.target.value)} />
          <br/>
          <label>Password: </label>
          <br/>
          <input type="password" onChange={e => setPassword(e.target.value)} />
          <br/>
          <button onClick={auth}>Sign In</button>
        </div>)
        : (<View screen={screen} setScreen={setScreen} />
        )}
    </div>
  );
}

export default App;

