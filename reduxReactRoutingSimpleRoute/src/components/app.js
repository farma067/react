import React from 'react';
import NavBar from './navBar';
const App = (props) => (
  <div className='appComp' >
    <NavBar />
    <div>
      {props.children}
    </div>
  </div>
)

export default App;