import React from 'react';
import logo from './logo.svg';
import './styles/App.css';

function App(props) {
  console.log(props)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.12222221js</code> and save to 21312131231332321.
        </p>
        {props.children}
      </header>
    </div>
  );
}

export default App;
