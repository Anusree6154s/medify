import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppProviders from './contexts/AppProviders';

import HomePage from './pages/Home/HomePage';
import FindDoctorsPage from './pages/FindDoctors/FindDoctorsPage';
import MyBookingsPage from './pages/MyBookings/MyBookingsPage';

function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-doctors" element={<FindDoctorsPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
        </Routes>
      </Router>
    </AppProviders>
  );
}

export default App;
