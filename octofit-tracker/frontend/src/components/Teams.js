import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
                if (active)
                    setItems(nextItems);
            }
            catch (loadError) {
                if (active)
                    setError(loadError.message || 'Unable to load teams.');
            }
        }
        loadTeams();
        return () => {
            active = false;
        };
    }, []);
    return (_jsx("section", { className: "card shadow-sm border-0", children: _jsxs("div", { className: "card-body", children: [_jsx("h1", { className: "h3 mb-3", children: "Teams" }), error ? (_jsx("div", { className: "alert alert-danger", children: error })) : (_jsx("div", { className: "row g-3", children: items.length === 0 ? (_jsx("div", { className: "col-12", children: _jsx("div", { className: "text-muted text-center py-4", children: "No teams available." }) })) : (items.map((team, index) => (_jsx("div", { className: "col-md-6 col-xl-4", children: _jsx("div", { className: "card border-0 shadow-sm h-100", children: _jsxs("div", { className: "card-body", children: [_jsx("h2", { className: "h5 mb-2", children: team.name || 'Unnamed team' }), _jsx("p", { className: "text-muted mb-2", children: team.description || 'No description provided.' }), _jsxs("div", { className: "small text-secondary", children: ["Members: ", team.members?.length || team.memberCount || 0] })] }) }) }, team._id || team.id || `${team.name}-${index}`)))) }))] }) }));
}
export default Teams;
//# sourceMappingURL=Teams.js.map