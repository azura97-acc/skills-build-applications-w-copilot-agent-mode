import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollection } from '../utils/api';

function Users() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl('users'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const nextItems = normalizeCollection(payload, 'users');

        if (active) setItems(nextItems);
      } catch (loadError) {
        if (active) setError(loadError.message || 'Unable to load users.');
      }
    }

    loadUsers();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h1 className="h3 mb-3">Users</h1>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-muted text-center py-4">
                      No users available.
                    </td>
                  </tr>
                ) : (
                  items.map((user, index) => (
                    <tr key={user._id || user.id || `${user.name}-${index}`}>
                      <td>{user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || '—'}</td>
                      <td>{user.email || '—'}</td>
                      <td>{user.role || user.position || 'Student'}</td>
                      <td>{user.team || user.teamName || '—'}</td>
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

export default Users;
