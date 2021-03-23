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
    setMessage('Buscando dados do servidor')
    const fetchData = async () => {
      axios(apiUrl)
        .then(result => {

            if (result.data.length === 0 ) {
              setMessage('Não existe curso cadastrado!')
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
              {
                data.map((item, idx) => {
                  return <ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.courseName}</ListGroup.Item>
                })
              }
            </ListGroup>

      }

    </div>

  );
}
//
export default withRouter(ListCourses);
