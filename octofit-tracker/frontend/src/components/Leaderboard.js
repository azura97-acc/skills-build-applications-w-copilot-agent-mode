import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
                if (active)
                    setItems(nextItems);
            }
            catch (loadError) {
                if (active)
                    setError(loadError.message || 'Unable to load leaderboard.');
            }
        }
        loadLeaderboard();
        return () => {
            active = false;
        };
    }, []);
    return (_jsx("section", { className: "card shadow-sm border-0", children: _jsxs("div", { className: "card-body", children: [_jsx("h1", { className: "h3 mb-3", children: "Leaderboard" }), error ? (_jsx("div", { className: "alert alert-danger", children: error })) : (_jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-striped align-middle mb-0", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Rank" }), _jsx("th", { children: "Name" }), _jsx("th", { children: "Points" }), _jsx("th", { children: "Team" })] }) }), _jsx("tbody", { children: items.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: "4", className: "text-muted text-center py-4", children: "No leaderboard entries available." }) })) : (items.map((item, index) => (_jsxs("tr", { children: [_jsx("td", { children: item.rank || index + 1 }), _jsx("td", { children: item.name || item.user || '—' }), _jsx("td", { children: item.points || item.score || 0 }), _jsx("td", { children: item.team || item.teamName || '—' })] }, item._id || item.id || `${item.name}-${index}`)))) })] }) }))] }) }));
}
export default Leaderboard;
//# sourceMappingURL=Leaderboard.js.map