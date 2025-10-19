const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get token
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper function to make API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = getToken();

  const headers: HeadersInit = {
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

// Auth APIs
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Reports APIs
export const reportsAPI = {
  upload: (formData: FormData) =>
    apiCall('/reports/upload', {
      method: 'POST',
      body: formData,
    }),

  getAll: () => apiCall('/reports'),

  getById: (id: string) => apiCall(`/reports/${id}`),

  delete: (id: string) =>
    apiCall(`/reports/${id}`, {
      method: 'DELETE',
    }),
};

// Vitals data type
export interface VitalsData {
  date: string;
  bloodPressure?: { systolic: number; diastolic: number };
  bloodSugar?: number;
  weight?: number;
  heartRate?: number;
  temperature?: number;
  notes?: string;
}

// Vitals APIs
export const vitalsAPI = {
  getAll: () => apiCall('/vitals'),

  add: (data: VitalsData) =>
    apiCall('/vitals', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<VitalsData>) =>
    apiCall(`/vitals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiCall(`/vitals/${id}`, {
      method: 'DELETE',
    }),
};

// Family Members APIs
export const familyMembersAPI = {
  getAll: () => apiCall('/family-members'),

  getById: (id: string) => apiCall(`/family-members/${id}`),

  create: (data: { name: string; relation: string; color?: string; customId?: string }) =>
    apiCall('/family-members', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: { name?: string; relation?: string; color?: string; customId?: string }) =>
    apiCall(`/family-members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiCall(`/family-members/${id}`, {
      method: 'DELETE',
    }),
};

// User data type
export interface User {
  userId: string;
  name: string;
  email: string;
}

// Auth helper functions
export const auth = {
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  },

  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  getToken,

  setUser: (user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  getUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  isAuthenticated: () => {
    return !!getToken();
  },
};
