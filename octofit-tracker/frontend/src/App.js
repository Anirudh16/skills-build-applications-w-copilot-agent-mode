import React from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  const navLinkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <div className="App container py-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border rounded shadow-sm mb-4 app-navbar">
        <div className="container-fluid">
          <NavLink className="navbar-brand d-flex align-items-center gap-2 fw-bold app-brand" to="/activities">
            <img src="/octofitapp-small.png" alt="OctoFit logo" className="app-brand-logo" />
            <div>
              <div className="brand-title">OctoFit Tracker</div>
              <div className="brand-tagline text-muted-small">Fitness tracking dashboard</div>
            </div>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {['activities', 'leaderboard', 'teams', 'users', 'workouts'].map((route) => (
                <li className="nav-item" key={route}>
                  <NavLink className={navLinkClass} to={`/${route}`}>
                    {route.charAt(0).toUpperCase() + route.slice(1)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="card shadow-sm bg-white border-0 app-shell">
        <div className="card-body">
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
