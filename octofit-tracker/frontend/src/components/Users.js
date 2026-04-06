import React, { useCallback, useEffect, useState } from 'react';
import { getApiUrl } from '../api';

function Users() {
  const [items, setItems] = useState([]);
  const [rawData, setRawData] = useState(null);
  const [error, setError] = useState(null);
  const [showRawModal, setShowRawModal] = useState(false);
  // Codespace Django REST API endpoint: https://{CODESPACE_NAME}-8000.app.github.dev/api/users
  const endpoint = getApiUrl('users');

  const fetchData = useCallback(async () => {
    console.log('[Users] fetching endpoint', endpoint);
    setError(null);

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log('[Users] fetched data', data);
      if (!response.ok) {
        throw new Error(data.detail || response.statusText);
      }
      setRawData(data);
      setItems(
        Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : []
      );
    } catch (fetchError) {
      console.error('[Users] fetch error', fetchError);
      setError(fetchError.message || 'Unable to load users');
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatValue = (value) => {
    if (value === null || value === undefined) {
      return '-';
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  };

  const renderTable = () => {
    if (!items.length) {
      return null;
    }

    const firstItem = items[0];
    const rowKeys =
      typeof firstItem === 'object' && firstItem !== null
        ? Object.keys(firstItem)
        : ['Value'];

    return (
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>{rowKeys.map((key) => <th key={key}>{key}</th>)}</tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item?.id ?? index}>
                {rowKeys.map((key) => (
                  <td key={key}>{formatValue(item[key] ?? item)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
        <div>
          <h2 className="h4 mb-1">Users</h2>
          <p className="text-muted-small mb-0">User data served by the Django REST API.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm" type="button" onClick={fetchData}>
            Refresh
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            type="button"
            disabled={!rawData}
            onClick={() => setShowRawModal(true)}
          >
            View Raw
          </button>
        </div>
      </div>

      <div className="card-body">
        <form className="row g-2 mb-3">
          <div className="col-12 col-md-10">
            <label htmlFor="usersEndpoint" className="form-label visually-hidden">
              API Endpoint
            </label>
            <input
              id="usersEndpoint"
              className="form-control api-endpoint-input"
              type="text"
              readOnly
              value={endpoint}
            />
          </div>
        </form>

        {error && <div className="alert alert-danger">{error}</div>}
        {!rawData && !error && <div className="alert alert-info">Loading users...</div>}
        {rawData && items.length === 0 && !error && (
          <div className="alert alert-warning">No users available from the API.</div>
        )}
        {renderTable()}
      </div>

      {showRawModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Users Raw API Response</h5>
                  <button type="button" className="btn-close" onClick={() => setShowRawModal(false)} />
                </div>
                <div className="modal-body">
                  <pre className="bg-light p-3 rounded">{JSON.stringify(rawData, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowRawModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}

export default Users;
