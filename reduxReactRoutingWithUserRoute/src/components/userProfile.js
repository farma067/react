import React from 'react';
import Button from './button';
import UserItem from './userItem';

const UserProfile = (props) => {
  console.log('Props =', props);
  const { userProfile } = props;
  const { data, fetchUsers, setUser } = props;
  return (
    userProfile ?
    <div className='container'>
      <div className='container'>
          <img src={`${userProfile.picture.large}`} />
          <span>{`${userProfile.name.title}, ${userProfile.name.first} ${userProfile.name.last}`}</span>
          <span>{userProfile.email}</span>
      </div>
      <div className='container'>
        <div id={'users'}>
          {data.users.map((user, i) => {
            return <UserItem
              key={i}
              user={user}
              onClick={() => setUser(user)}
            />
          })}
        </div>
      </div>

    </div>
    : <h1>Looks like you haven't selected a user</h1>
  )
}

export default UserProfile;