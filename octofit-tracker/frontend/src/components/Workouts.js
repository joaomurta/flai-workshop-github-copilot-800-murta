import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://orange-carnival-xr9jwp9pg9vfv74r-8000.app.github.dev/api/workouts/';
    console.log('Workouts REST API endpoint:', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Workouts fetched data:', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-5 state-box">
      <div className="spinner-border text-primary me-3" role="status" />
      <span className="fs-5">Loading workouts...</span>
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
      <h2 className="page-heading">&#128170; Workouts</h2>
      <div className="row g-4">
        {workouts.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">No workouts found.</div>
          </div>
        ) : (
          workouts.map((workout, index) => (
            <div className="col-md-6 col-lg-4" key={workout._id || index}>
              <div className="card octofit-card h-100">
                <div className="card-header">&#128170; {workout.name}</div>
                <div className="card-body">
                  <p className="card-text">{workout.description}</p>
                </div>
                <div className="card-footer text-muted d-flex justify-content-between align-items-center">
                  <small>Workout #{index + 1}</small>
                  <button className="btn btn-primary btn-sm">View Details</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Workouts;
