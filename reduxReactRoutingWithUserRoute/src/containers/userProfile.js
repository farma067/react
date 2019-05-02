import { connect } from 'react-redux';
import UserProfile from '../components/userProfile';
import { fetchUsers, setUser } from '../actions/users';

const mapStateToProps = (state) => ({
  userProfile: state.userProfile,
  data: state.usersReducer
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers())
    },
    setUser: (user) => {
      dispatch(setUser(user))
    }
  }
}

const UserProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile)

export default UserProfileContainer;