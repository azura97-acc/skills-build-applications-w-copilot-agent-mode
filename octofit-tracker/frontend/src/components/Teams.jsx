import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollection } from '../utils/api';

function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadTeams() {
      try {
        const response = await fetch(buildApiUrl('teams'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const nextItems = normalizeCollection(payload, 'teams');

        if (active) setItems(nextItems);
      } catch (loadError) {
        if (active) setError(loadError.message || 'Unable to load teams.');
      }
    }

    loadTeams();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h1 className="h3 mb-3">Teams</h1>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row g-3">
            {items.length === 0 ? (
              <div className="col-12">
                <div className="text-muted text-center py-4">No teams available.</div>
              </div>
            ) : (
              items.map((team, index) => (
                <div key={team._id || team.id || `${team.name}-${index}`} className="col-md-6 col-xl-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <h2 className="h5 mb-2">{team.name || 'Unnamed team'}</h2>
                      <p className="text-muted mb-2">{team.description || 'No description provided.'}</p>
                      <div className="small text-secondary">
                        Members: {team.members?.length || team.memberCount || 0}
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

export default Teams;
