import React, { Component } from 'react';
import Users from './Users'
import AddUser from './AddUser'
import './App.css'

class App extends Component {
  state = {
    users: [
      { name: 'Pep', age: 30, dept: 'science', id: 1 },
      { name: 'Tim', age: 20, dept: 'arts', id: 2 },
      { name: 'Chris', age: 25, dept: 'commerce', id: 3 }
    ]
  }
  addUser = (user) => {
    user.id = Math.random();
    let users = [...this.state.users, user];
    this.setState({
      users: users
    });
  }
  deleteUser = (id) => {
    // console.log(id);
    let users = this.state.users.filter(user => {
      return user.id !== id
    });
    this.setState({
      users: users
    });
  }
  render() {
    return (
      <div className="App">
        <h1>Component communication through props</h1>
        <Users users={this.state.users} deleteUser={this.deleteUser} />
        <AddUser addUser={this.addUser} />
      </div>
    );
  }
}

export default App;