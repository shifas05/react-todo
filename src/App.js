import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import "tailwindcss/base.css";
import "tailwindcss/components.css";
import "tailwindcss/utilities.css";
import './App.css';

import Navbar from './components/Navbar';

import About from './pages/About';
import Home from './pages/Home';

axios.defaults.baseURL = 'http://todo.test/api/';

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="flex mb-4">
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </div>
    </Router>
  );
}

export default App;
