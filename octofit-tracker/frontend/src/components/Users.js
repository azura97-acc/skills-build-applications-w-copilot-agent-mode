import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
                if (active)
                    setItems(nextItems);
            }
            catch (loadError) {
                if (active)
                    setError(loadError.message || 'Unable to load users.');
            }
        }
        loadUsers();
        return () => {
            active = false;
        };
    }, []);
    return (_jsx("section", { className: "card shadow-sm border-0", children: _jsxs("div", { className: "card-body", children: [_jsx("h1", { className: "h3 mb-3", children: "Users" }), error ? (_jsx("div", { className: "alert alert-danger", children: error })) : (_jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-hover align-middle mb-0", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Name" }), _jsx("th", { children: "Email" }), _jsx("th", { children: "Role" }), _jsx("th", { children: "Team" })] }) }), _jsx("tbody", { children: items.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: "4", className: "text-muted text-center py-4", children: "No users available." }) })) : (items.map((user, index) => (_jsxs("tr", { children: [_jsx("td", { children: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || '—' }), _jsx("td", { children: user.email || '—' }), _jsx("td", { children: user.role || user.position || 'Student' }), _jsx("td", { children: user.team || user.teamName || '—' })] }, user._id || user.id || `${user.name}-${index}`)))) })] }) }))] }) }));
}
export default Users;
//# sourceMappingURL=Users.js.map