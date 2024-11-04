import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './page/Navigation';
import Home from './page/Home';
import MyEvent from './page/Myevent';


function App() {
  return (
      <Router>
        <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myevent" element={<MyEvent />} />
          </Routes>
      
      </Router>
    
  );
}

export default App;
