const API_BASE_URL = 'http://localhost:8080/api';

export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  return data;
};

export const fetchProfile = async () => {
  const token = localStorage.getItem('agent_token');
  const response = await fetch(`${API_BASE_URL}/tenant/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch profile');
  }
  return data;
};

export const fetchPayments = async () => {
  const token = localStorage.getItem('agent_token');
  const response = await fetch(`${API_BASE_URL}/tenant/payments`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch payments');
  }
  return data;
};

export const fetchDashboard = async () => {
  const token = localStorage.getItem('agent_token');
  const response = await fetch(`${API_BASE_URL}/tenant/dashboard`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch dashboard');
  }
  return data;
};
