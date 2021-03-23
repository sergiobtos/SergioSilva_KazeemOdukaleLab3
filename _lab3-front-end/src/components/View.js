import CreateCourse from './CreateCourse';
import React, { useState } from 'react';
import axios from 'axios';

function View (props) {
  
  const { screen, setScreen } = props;
  const [data, setData] = useState();
  const [course, setCourse] = useState('');
  
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
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  
  const listCourses = (email) => {

    console.log('in lisCourse: ',email);
    // setCourse('n')

  }
  //
  const createCourse = () => {
    console.log('in createCourse')
    setCourse('y')
    

  }
  //
  return (
    <div className="App">
      {course !== 'y'
        ? <div>
            <button onClick={createCourse}>Create Course</button>
            <button onClick={listCourses(data)}>List Courses</button>

            <button onClick={deleteCookie}>Log out</button>
          </div>            
        : <CreateCourse screen={screen} />
      }
    </div>
  );
}

export default View;