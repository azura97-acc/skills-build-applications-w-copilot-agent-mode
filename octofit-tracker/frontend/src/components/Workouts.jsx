/**
 * Workouts Component
 *
 * Displays workout plans and routines in a responsive card grid.
 *
 * React 19 Patterns:
 * - useState for workout list and error state management
 * - useEffect with proper cleanup (active flag prevents state updates after unmount)
 * - Responsive grid layout with Bootstrap classes
 *
 * API Integration:
 * - Fetches from: import.meta.env.VITE_CODESPACE_NAME-8000.app.github.dev/api/workouts/
 * - Intelligently normalizes both paginated and direct array responses
 *
 * Field Mapping:
 * - title: workout.title
 * - difficulty: workout.difficulty
 * - durationMinutes: workout.durationMinutes
 * - exercises: workout.exercises (array of exercise names)
 */

import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollection } from '../utils/api';

function Workouts() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadWorkouts() {
      try {
        const response = await fetch(buildApiUrl('workouts'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const nextItems = normalizeCollection(payload, 'workouts');

        if (active) setItems(nextItems);
      } catch (loadError) {
        if (active) setError(loadError.message || 'Unable to load workouts.');
      }
    }

    loadWorkouts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h1 className="h3 mb-3">Workouts</h1>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row g-3">
            {items.length === 0 ? (
              <div className="col-12">
                <div className="text-muted text-center py-4">No workouts available.</div>
              </div>
            ) : (
              items.map((workout, index) => (
                <div key={workout._id || workout.id || `${workout.title}-${index}`} className="col-md-6 col-xl-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <h2 className="h5 mb-2">{workout.title || 'Workout plan'}</h2>
                      <div className="mb-3">
                        <span className="badge bg-info text-dark">{workout.difficulty || 'Unrated'}</span>
                      </div>
                      <p className="text-muted small mb-2">
                        <strong>Duration:</strong> {workout.durationMinutes || '—'} minutes
                      </p>
                      <div className="small text-secondary">
                        <strong>Exercises:</strong>
                        <ul className="mb-0 ps-3 mt-1">
                          {workout.exercises && workout.exercises.length > 0 ? (
                            workout.exercises.map((exercise, i) => (
                              <li key={i}>{exercise}</li>
                            ))
                          ) : (
                            <li>No exercises listed</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Workouts;
