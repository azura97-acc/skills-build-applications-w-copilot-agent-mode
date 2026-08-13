/**
 * Leaderboard Component
 *
 * Displays a competitive leaderboard ranking users by points or scores.
 *
 * React 19 Patterns:
 * - useState for managing leaderboard items and error state
 * - useEffect with cleanup for data fetching
 * - Conditional rendering for empty states and error messages
 *
 * API Integration:
 * - Fetches from: import.meta.env.VITE_CODESPACE_NAME-8000.app.github.dev/api/leaderboard/
 * - Supports paginated and array-based responses
 *
 * Field Mapping:
 * - rank: item.rank
 * - name: item.name
 * - points: item.score
 * - team: item.teamName (optional)
 */

import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollection } from '../utils/api';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadLeaderboard() {
      try {
        const response = await fetch(buildApiUrl('leaderboard'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const nextItems = normalizeCollection(payload, 'leaderboard');

        if (active) setItems(nextItems);
      } catch (loadError) {
        if (active) setError(loadError.message || 'Unable to load leaderboard.');
      }
    }

    loadLeaderboard();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h1 className="h3 mb-3">Leaderboard</h1>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Points</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-muted text-center py-4">
                      No leaderboard entries available.
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={item._id || item.id || `${item.name}-${index}`}>
                      <td>{item.rank || index + 1}</td>
                      <td>{item.name || '—'}</td>
                      <td>{item.score || 0}</td>
                      <td>{item.teamName || '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Leaderboard;
