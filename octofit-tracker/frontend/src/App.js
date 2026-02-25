import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="container mt-5">
      <div className="hero-section">
        <h1>&#127939; OctoFit Tracker</h1>
        <p className="mt-3">Track your fitness activities, compete with your team, and reach your goals.</p>
        <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
          <NavLink to="/users" className="btn btn-light btn-lg fw-semibold">Users</NavLink>
          <NavLink to="/teams" className="btn btn-outline-light btn-lg fw-semibold">Teams</NavLink>
          <NavLink to="/activities" className="btn btn-outline-light btn-lg fw-semibold">Activities</NavLink>
          <NavLink to="/leaderboard" className="btn btn-outline-light btn-lg fw-semibold">Leaderboard</NavLink>
          <NavLink to="/workouts" className="btn btn-outline-light btn-lg fw-semibold">Workouts</NavLink>
        </div>
      </div>
      <div className="row mt-5 g-4">
        <div className="col-md-4">
          <div className="card octofit-card h-100">
            <div className="card-header">&#128100; Users</div>
            <div className="card-body">Manage athlete profiles and track individual progress.</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card octofit-card h-100">
            <div className="card-header">&#128101; Teams</div>
            <div className="card-body">Create teams, add members, and compete together.</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card octofit-card h-100">
            <div className="card-header">&#127939; Activities</div>
            <div className="card-body">Log your workouts and monitor your activity history.</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card octofit-card h-100">
            <div className="card-header">&#127942; Leaderboard</div>
            <div className="card-body">See who's on top with the competitive leaderboard.</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card octofit-card h-100">
            <div className="card-header">&#128170; Workouts</div>
            <div className="card-body">Browse personalized workout suggestions.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand" to="/">&#127939; OctoFit Tracker</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/users">&#128100; Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/teams">&#128101; Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/activities">&#127939; Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/leaderboard">&#127942; Leaderboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/workouts">&#128170; Workouts</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
