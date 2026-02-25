import React, { useState, useEffect } from 'react';

const MEDALS = ['&#127947;', '&#129352;', '&#129353;'];

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://orange-carnival-xr9jwp9pg9vfv74r-8000.app.github.dev/api/leaderboard/';
    console.log('Leaderboard REST API endpoint:', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard fetched data:', data);
        setEntries(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-5 state-box">
      <div className="spinner-border text-primary me-3" role="status" />
      <span className="fs-5">Loading leaderboard...</span>
    </div>
  );

  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <strong>Error:&nbsp;</strong>{error}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2 className="page-heading">&#127942; Leaderboard</h2>
      <div className="card octofit-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Top Performers</span>
          <span className="badge bg-light text-primary">{entries.length} athletes</span>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover octofit-table mb-0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr><td colSpan="3" className="text-center text-muted py-4">No entries found.</td></tr>
              ) : (
                entries.map((entry, index) => (
                  <tr key={entry._id || index} className={index === 0 ? 'table-warning' : ''}>
                    <td>
                      {index < 3
                        ? <span dangerouslySetInnerHTML={{ __html: MEDALS[index] }} />
                        : <span className="rank-badge">{index + 1}</span>
                      }
                    </td>
                    <td><strong>{entry.user}</strong></td>
                    <td><span className="badge bg-success fs-6">{entry.score}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
