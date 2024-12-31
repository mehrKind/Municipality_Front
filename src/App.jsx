import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Security from './Security';
import Login from './components/accounts/Login';
import Home from './components/main/Home';
import Report from './screens/report/Report';


const App = () => {
  return (
    <Router>

      <Routes>
        <Route
          path="/"
          element={
            <Security>
              <Home />
            </Security>
          }
        />
        <Route path="/report/*" element={
          <Security>
            <Report/>
          </Security>
        } />

        <Route path="/login" element={<Login/>} />

      </Routes>
    </Router>
  );
};

export default App;
