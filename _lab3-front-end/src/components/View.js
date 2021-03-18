import CreateCourse from './CreateCourse';
import React, { useState } from 'react';
import axios from 'axios';

function View (props) {
  
  const { screen, setScreen } = props;
  const [data, setData] = useState();
  const [course, setCourse] = useState('');
  
  const deleteCookie = async () => {
    try {
      await axios.get('5000/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  
  
  const listCourses = (email) => {

    console.log('in lisArticles: ',email);
    //setArticle('n')

  }
  //
  const createCourse = () => {
    console.log('in createArticle')
    setCourse('y')

  }
  //
  return (
    <div className="App">
      {course !== 'y'
        ? <div>
            <p>this is the screen{screen}</p>
            <p>this is the data{data}</p>
            <button onClick={createCourse}>Create Course</button>
            <button onClick={listCourses(data)}>List Courses</button>

            <button onClick={deleteCookie}>Log out</button>
          </div>            
        : <createCourse screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}

export default View;