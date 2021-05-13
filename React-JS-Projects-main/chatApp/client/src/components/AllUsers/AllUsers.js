import React from 'react';

import "./AllUsers.css";

import onlineIcon from "../../icons/onlineIcon.png";

const AllUsers = ({users}) => (
    users.map(user => 
        <div className="textContainer">
    <div>
      <h1>Chaterr Application <span role="img" aria-label="emoji">💬</span></h1>
    </div>
    {
      users && (
          <div>
            <h1>People currently chatting:</h1>
            <div className="activeContainer">
              
            {users.map((name) => (
                <div key={name} className="activeItem">
                
                <h2><span><img alt="Online Icon" src={onlineIcon}/></span>{name}</h2>

                </div>
            ))}
              
            </div>
          </div>
        )
        
    }
  </div>
    )
);

export default AllUsers ;