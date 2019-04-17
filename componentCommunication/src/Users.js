import React from 'react'

const Users = ({users, deleteUser}) => {
  return (
    <div className="user-list">
      { 
        users.map(user => {
          return (
            <div className="user" key={user.id}>
              <div>Name: { user.name }</div>
              <div>Age: { user.age }</div>
              <div>Dept: { user.dept }</div>
              <button onClick={() => {deleteUser(user.id)}}>Delete user</button>
            </div>
          )
        })
      }
    </div>
  );
}

export default Users