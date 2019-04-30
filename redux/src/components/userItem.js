import React from 'react';
import { Link } from 'react-router';

const UserItem = (props) => (
  <Link
    className='box'
    onClick={props.onClick}
    to={`/users`}
  >
    <img src={props.user.picture.thumbnail} />
    <span>{props.user.login.username}</span>
  </Link>
)

UserItem.propTypes = {
  user: React.PropTypes.object.isRequired,
};

export default UserItem