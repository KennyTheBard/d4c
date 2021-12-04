import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Searchbar } from './components/Searchbar';
import { Header } from './components/Header';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <br></br>
        <Header/>
        <br></br>
        <Searchbar/>
        <br></br>
        
      </header>
    </div>
  );
}

export default App;
