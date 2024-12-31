import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SendReport from '../../components/reports/SendReport';


// Sample components for the routes

const Report = () => {
  return (
    <Routes>
        <Route path="/send" element={<SendReport/>} />

    </Routes>
  );
};

export default Report;
