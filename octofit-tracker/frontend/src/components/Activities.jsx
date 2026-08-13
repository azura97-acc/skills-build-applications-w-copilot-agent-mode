/**
 * Activities Component
 *
 * Displays a list of activity logs fetched from the backend API.
 *
 * React 19 Patterns:
 * - useState for component state management
 * - useEffect with cleanup for data fetching (prevents memory leaks)
 * - Proper error handling and user feedback
 *
 * API Integration:
 * - Fetches from: import.meta.env.VITE_CODESPACE_NAME-8000.app.github.dev/api/activities/
 * - Supports paginated and array-based responses via normalizeCollection()
 *
 * Field Mapping:
 * - date: item.activityDate
 * - type: item.type
 * - duration: item.durationMinutes
 * - caloriesBurned: item.caloriesBurned
 * - distance: item.distance (optional)
 * - notes: item.notes (optional)
 */

import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollection } from '../utils/api';

function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadActivities() {
      try {
        const response = await fetch(buildApiUrl('activities'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const nextItems = normalizeCollection(payload, 'activities');

        if (active) setItems(nextItems);
      } catch (loadError) {
        if (active) setError(loadError.message || 'Unable to load activities.');
      }
    }

    loadActivities();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h1 className="h3 mb-3">Activities</h1>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Duration (min)</th>
                  <th>Calories</th>
                  <th>Distance</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-muted text-center py-4">
                      No activities available.
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={item._id || item.id || `${item.type}-${index}`}>
                      <td>{new Date(item.activityDate).toLocaleDateString() || '—'}</td>
                      <td>{item.type || '—'}</td>
                      <td>{item.durationMinutes || '—'}</td>
                      <td>{item.caloriesBurned || '—'}</td>
                      <td>{item.distance || '—'}</td>
                      <td>{item.notes || '—'}</td>
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

export default Activities;
