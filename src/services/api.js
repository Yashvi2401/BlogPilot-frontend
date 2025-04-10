// API service for interacting with the backend

const API_URL = 'http://localhost:5000'; // Adjust this based on your backend URL

// Helper function to handle authentication
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Authentication API
export const loginUser = async (email, password) => {
  const formData = new FormData();
  formData.append('username', email); // Note: FastAPI OAuth2 uses 'username' for the email
  formData.append('password', password);

  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Login failed');
  }

  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/user/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Registration failed');
  }

  return response.json();
};

// Blog API
export const getBlogs = async (page = 1, size = 10) => {
  const response = await fetch(`${API_URL}/blog/?page=${page}&size=${size}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch blogs');
  }

  return response.json();
};

export const getBlogById = async (id) => {
  const response = await fetch(`${API_URL}/blog/${id}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch blog');
  }

  return response.json();
};

export const createBlog = async (blogData) => {
  const response = await fetch(`${API_URL}/blog/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(blogData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create blog');
  }

  return response.json();
};

export const updateBlog = async (id, blogData) => {
  const response = await fetch(`${API_URL}/blog/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(blogData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to update blog');
  }

  return response.json();
};

export const deleteBlog = async (id) => {
  const response = await fetch(`${API_URL}/blog/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to delete blog');
  }

  return response.json();
};

export const searchBlogs = async (searchString) => {
  const response = await fetch(`${API_URL}/blog/${searchString}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to search blogs');
  }

  return response.json();
};

export const getBlogSummary = async (id) => {
  const response = await fetch(`${API_URL}/blog/${id}/summary`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to generate summary');
  }

  return response.json();
};

export const getUserByEmail = async (email) => {
  const response = await fetch(`${API_URL}/user/${email}`, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch user');
  }

  return response.json();
}; 