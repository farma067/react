import React from 'react';
import Button from './button';
import UserItem from './userItem';

class Users extends React.Component {  
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.props.fetchUsers();
  }
  render() {
    const { data, fetchUsers,userProfile, setUser } = this.props;
    
    if(userProfile)
    var profile =
      <div className='container'>
          <img src={`${userProfile.picture.large}`} />
          <span>{`${userProfile.name.title}, ${userProfile.name.first} ${userProfile.name.last}`}</span>
          <span>{userProfile.email}</span>
      </div>;
      else
        profile = <h1>Select a user</h1>;
        
    return (
      <div>
      {profile}
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
    )
  }
}

export default Users;