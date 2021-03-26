import CreateCourse from './CreateCourse';
import ListCourses from './ListCourses';

import React, { useState } from 'react';
import axios from 'axios';

function View (props) {
  
  const { screen, setScreen } = props;
  const [data, setData] = useState();
  const [course, setCourse] = useState();
  
  const deleteCookie = async () => {

      axios.get('/signout').then(res => {

        localStorage.removeItem('email')

        setScreen('auth')

      }).catch(err => {
        
        console.log(err)

      });

  };
  
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/welcome');
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  
  const listCourses = async (email) => {
    setCourse('n')
  }
  //
  const createCourse = () => {
    setCourse('y')

  }
  //
  return (
    <div className="App">
      <button onClick={createCourse}>Create Course</button>
      <button onClick={listCourses}>List Courses</button>
      <button onClick={deleteCookie}>Log out</button>

      {course !== 'y'
        ? <div>
            
            <ListCourses screen={screen} />

          </div>            
        : <CreateCourse screen={screen} />
      }
    </div>
  );
}

export default View;