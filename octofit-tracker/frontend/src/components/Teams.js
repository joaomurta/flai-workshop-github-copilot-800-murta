import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://orange-carnival-xr9jwp9pg9vfv74r-8000.app.github.dev/api/teams/';
    console.log('Teams REST API endpoint:', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Teams fetched data:', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-5 state-box">
      <div className="spinner-border text-primary me-3" role="status" />
      <span className="fs-5">Loading teams...</span>
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
      <h2 className="page-heading">&#128101; Teams</h2>
      <div className="card octofit-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>All Teams</span>
          <span className="badge bg-light text-primary">{teams.length} total</span>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover octofit-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Team Name</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr><td colSpan="3" className="text-center text-muted py-4">No teams found.</td></tr>
              ) : (
                teams.map((team, index) => (
                  <tr key={team._id || index}>
                    <td className="text-muted">{index + 1}</td>
                    <td><strong>{team.name}</strong></td>
                    <td>
                      {Array.isArray(team.members)
                        ? team.members.map((m, i) => (
                            <span key={i} className="badge bg-primary me-1">{m}</span>
                          ))
                        : <span className="badge bg-primary">{team.members}</span>
                      }
                    </td>
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

export default Teams;
