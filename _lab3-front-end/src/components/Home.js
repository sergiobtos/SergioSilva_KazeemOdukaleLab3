
import { withRouter } from 'react-router-dom';

import React, { Component }  from 'react';

function Home(props)
{


    return (
        <div>
            <h2> Express - React with CRUD Operations</h2>
            <p>Lab Assignment #3 – Designing and implementing a complete web app using MERN stack</p>
        </div>
    );

}

export default withRouter(Home);