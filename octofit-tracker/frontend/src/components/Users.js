import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://orange-carnival-xr9jwp9pg9vfv74r-8000.app.github.dev/api/users/';
    console.log('Users REST API endpoint:', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Users fetched data:', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-5 state-box">
      <div className="spinner-border text-primary me-3" role="status" />
      <span className="fs-5">Loading users...</span>
    </div>
  );

  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <strong>Error:&nbsp;</strong> {error}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2 className="page-heading">&#128100; Users</h2>
      <div className="card octofit-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>All Users</span>
          <span className="badge bg-light text-primary">{users.length} total</span>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover octofit-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="4" className="text-center text-muted py-4">No users found.</td></tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id || index}>
                    <td className="text-muted">{index + 1}</td>
                    <td><strong>{user.username}</strong></td>
                    <td>{user.email}</td>
                    <td><span className="badge bg-secondary">{user.age}</span></td>
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

export default Users;
