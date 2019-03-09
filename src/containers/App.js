import React from 'react';
import './App.css';
import BoardHeader from "components/BoardHeader";
import Board from "./Board";
import BoardActions from "components/BoardActions";

class App extends React.Component {
  render() {
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
    // );
    return (
        <div className="App">
          <BoardHeader/>
          <Board/>
          <BoardActions/>
        </div>
    );
  }
}

export default App;
