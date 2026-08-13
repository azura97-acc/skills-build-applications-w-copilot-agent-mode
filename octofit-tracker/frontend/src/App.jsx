import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
];

function Home() {
  return (
    <div className="row g-4">
      <div className="col-md-6">
        <div className="card h-100 shadow-sm border-0">
          <div className="card-body">
            <h2 className="h4 mb-3">Welcome to OctoFit Tracker</h2>
            <p className="text-muted mb-0">
              Track fitness activity, monitor team performance, and keep workouts aligned with
              student progress goals.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card h-100 shadow-sm border-0">
          <div className="card-body">
            <h2 className="h4 mb-3">App status</h2>
            <ul className="list-unstyled mb-0">
              <li>Frontend: React 19 + Vite</li>
              <li>Routing: react-router-dom</li>
              <li>Backend: Express API</li>
              <li>Env: import.meta.env.VITE_CODESPACE_NAME</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">OctoFit Tracker</span>
          <div className="navbar-nav ms-auto flex-row flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link px-3 rounded ${isActive ? 'bg-primary-subtle text-dark' : 'text-white-50'}`
                }
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
