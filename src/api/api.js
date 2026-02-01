import axios from 'axios';


// Create axios instance with default config
const api = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL || 'http://localhost:4000/',
    withCredentials: true, // Always send cookies
    headers: {
        'Content-Type': 'application/json'
    }
});


// Request interceptor (optional - for adding tokens to headers if needed)
api.interceptors.request.use(
    (config) => {
        // You can add additional headers here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



// Response interceptor for handling errors globally
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 and not already retrying, try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await api.post('/auth/refresh-token');
                // Retry original request
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed, redirect to login
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Auth API calls
export const authAPI = {
    signup: (userData) => api.post('/auth/signup', userData),
    login: (credentials) => api.post('/auth/signin', credentials),
    logout: () => api.post('/auth/logout'),
    refreshToken: () => api.post('/auth/refresh-token'),
    getCurrentUser: () => api.get('/auth/me')
};

// You can add more API modules here
// export const reportsAPI = { ... }
// export const usersAPI = { ... }

export default api;