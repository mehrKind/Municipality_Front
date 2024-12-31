import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SendReport from '../../components/reports/SendReport';
import AllReports from '../../components/reports/AllReports';


// Sample components for the routes

const Report = () => {
  return (
    <Routes>
        <Route path="/send" element={<SendReport/>} />
        <Route path="/all_report" element={<AllReports/>} />

    </Routes>
  );
};

export default Report;
