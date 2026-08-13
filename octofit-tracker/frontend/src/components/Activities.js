import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
                if (active)
                    setItems(nextItems);
            }
            catch (loadError) {
                if (active)
                    setError(loadError.message || 'Unable to load activities.');
            }
        }
        loadActivities();
        return () => {
            active = false;
        };
    }, []);
    return (_jsx("section", { className: "card shadow-sm border-0", children: _jsxs("div", { className: "card-body", children: [_jsx("h1", { className: "h3 mb-3", children: "Activities" }), error ? (_jsx("div", { className: "alert alert-danger", children: error })) : (_jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-hover align-middle mb-0", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Date" }), _jsx("th", { children: "Type" }), _jsx("th", { children: "Duration" }), _jsx("th", { children: "Distance" }), _jsx("th", { children: "Notes" })] }) }), _jsx("tbody", { children: items.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: "5", className: "text-muted text-center py-4", children: "No activities available." }) })) : (items.map((item, index) => (_jsxs("tr", { children: [_jsx("td", { children: item.date || item.createdAt || '—' }), _jsx("td", { children: item.type || item.activityType || '—' }), _jsx("td", { children: item.duration || item.minutes || '—' }), _jsx("td", { children: item.distance || item.miles || '—' }), _jsx("td", { children: item.notes || item.description || '—' })] }, item._id || item.id || `${item.type}-${index}`)))) })] }) }))] }) }));
}
export default Activities;
//# sourceMappingURL=Activities.js.map