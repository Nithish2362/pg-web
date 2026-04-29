const API_BASE_URL = 'http://localhost:8080/api';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('agent_token')}`,
});

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
};

export const login = async (username, password) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(res);
};

export const fetchDashboard = () =>
  fetch(`${API_BASE_URL}/tenant/dashboard`, { headers: authHeaders() }).then(handleResponse);

export const fetchProfile = () =>
  fetch(`${API_BASE_URL}/tenant/profile`, { headers: authHeaders() }).then(handleResponse);

export const fetchPayments = () =>
  fetch(`${API_BASE_URL}/tenant/payments`, { headers: authHeaders() }).then(handleResponse);

// Complaints
export const fetchMyComplaints = (pgNumber) =>
  fetch(`${API_BASE_URL}/complaints/tenant/${pgNumber}`, { headers: authHeaders() }).then(handleResponse);

export const raiseComplaint = (body) =>
  fetch(`${API_BASE_URL}/complaints`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  }).then(handleResponse);

// Notices
export const fetchActiveNotices = () =>
  fetch(`${API_BASE_URL}/notices/active`, { headers: authHeaders() }).then(handleResponse);

// Tenant Logs (In/Out)
export const fetchMyLogs = (pgNumber) =>
  fetch(`${API_BASE_URL}/tenant-logs/tenant/${pgNumber}`, { headers: authHeaders() }).then(handleResponse);

export const checkOut = (pgNumber) =>
  fetch(`${API_BASE_URL}/tenant-logs/out/${pgNumber}`, {
    method: 'POST',
    headers: authHeaders(),
  }).then(handleResponse);

export const checkIn = (pgNumber) =>
  fetch(`${API_BASE_URL}/tenant-logs/in/${pgNumber}`, {
    method: 'POST',
    headers: authHeaders(),
  }).then(handleResponse);

// Default export with Axios-like interface
const api = {
  get: (url) => fetch(`${API_BASE_URL}${url}`, { headers: authHeaders() }).then(handleResponse).then(data => ({ data })),
  post: (url, body) => fetch(`${API_BASE_URL}${url}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  }).then(handleResponse).then(data => ({ data })),
  put: (url, body) => fetch(`${API_BASE_URL}${url}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body),
  }).then(handleResponse).then(data => ({ data })),
  delete: (url) => fetch(`${API_BASE_URL}${url}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }).then(handleResponse).then(data => ({ data })),
};

export default api;
