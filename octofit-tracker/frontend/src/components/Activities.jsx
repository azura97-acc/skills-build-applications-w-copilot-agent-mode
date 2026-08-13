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
                  <th>Duration</th>
                  <th>Distance</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-muted text-center py-4">
                      No activities available.
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={item._id || item.id || `${item.type}-${index}`}>
                      <td>{item.date || item.createdAt || '—'}</td>
                      <td>{item.type || item.activityType || '—'}</td>
                      <td>{item.duration || item.minutes || '—'}</td>
                      <td>{item.distance || item.miles || '—'}</td>
                      <td>{item.notes || item.description || '—'}</td>
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
