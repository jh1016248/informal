import React from 'react';
import logo from './logo.svg';
import './styles/App.css';

function App(props) {
  return (
    <div className="App">
      <header className=""></header>
      {props.children}
    </div>
  );
}

export default App;
