import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import SigIn from './SignIn';

function ListCourses(props) {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState()
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses";

  useEffect(() => {
    setShowLoading(true);
    setMessage('Searching results in the database')
    const fetchData = async () => {
      axios(apiUrl)
        .then(result => {

            if (result.data.length === 0 ) {
              setMessage('No course found in database!')
            }

            setData(result.data);
            setShowLoading(false);
        }).catch((error) => {

          setMessage(error)
        });
      };  
    fetchData();

  }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: '/showcourse/' + id
    });
  }

  return (
    <div>
      {
        data && data.length === 0 
          ? <p>{ message }</p>
          : <ListGroup>
            <h1> List of All Courses in Database</h1>
              {
                data.map((item, idx) => {
                  return <ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{idx+1} - Course Code: { item.courseCode} ({item.courseName})</ListGroup.Item>
                })
              }
            </ListGroup>

      }

    </div>

  );
}
//
export default withRouter(ListCourses);
