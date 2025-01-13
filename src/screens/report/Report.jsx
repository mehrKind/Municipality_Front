import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SendReport from '../../components/reports/SendReport';
import AllReports from '../../components/reports/AllReports';
import PrintReport from '../../components/reports/PrintReport';


// Sample components for the routes

const Report = () => {
  return (
    <Routes>
        <Route path="/send" element={<SendReport/>} />
        <Route path="/all_report" element={<AllReports/>} />
        <Route path="/print" element={<PrintReport/>} />

    </Routes>
  );
};

export default Report;
