// API service for interacting with the backend

const API_URL = 'https://blogpilot-backend-production.up.railway.app'; // Updated to deployed backend URL

// Helper function to handle authentication
const getAuthHeaders = () => {
  try {
    const token = localStorage.getItem('access_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  } catch (error) {
    console.error('Error getting auth headers:', error);
    return {};
  }
};

// Authentication API
export const loginUser = async (email, password) => {
  console.log("email: ", email);
  console.log("password: ", password);
  try {
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
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
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
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Blog API
export const getBlogs = async (page = 1, size = 10) => {
  try {
    const response = await fetch(`${API_URL}/blog/?page=${page}&size=${size}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch blogs');
    }

    return response.json();
  } catch (error) {
    console.error('Get blogs error:', error);
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    console.log(`Fetching blog with ID: ${id}`);
    const response = await fetch(`${API_URL}/blog/id/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.error(`Blog with ID ${id} not found`);
        throw new Error(`Blog with ID ${id} not found`);
      }
      
      try {
        const error = await response.json();
        console.error(`Error fetching blog: ${error.detail || 'Unknown error'}`);
        throw new Error(error.detail || 'Failed to fetch blog');
      } catch (jsonError) {
        // If response is not JSON
        console.error(`Failed to parse error response: ${jsonError}`);
        throw new Error(`Failed to fetch blog (status: ${response.status})`);
      }
    }

    const data = await response.json();
    console.log(`Successfully fetched blog:`, data);
    return data;
  } catch (error) {
    console.error('Get blog error:', error);
    throw error;
  }
};

export const createBlog = async (blogData) => {
  try {
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
  } catch (error) {
    console.error('Create blog error:', error);
    throw error;
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    console.log(`Updating blog with ID ${id}`, blogData);
    
    const response = await fetch(`${API_URL}/blog/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      try {
        const error = await response.json();
        console.error(`Error updating blog: ${error.detail || 'Unknown error'}`);
        throw new Error(error.detail || 'Failed to update blog');
      } catch (jsonError) {
        // If response is not JSON
        console.error(`Failed to parse error response: ${jsonError}`);
        throw new Error(`Failed to update blog (status: ${response.status})`);
      }
    }

    const data = await response.json();
    console.log('Blog updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Update blog error:', error);
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await fetch(`${API_URL}/blog/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to delete blog');
    }

    return response.json();
  } catch (error) {
    console.error('Delete blog error:', error);
    throw error;
  }
};

export const searchBlogs = async (searchString) => {
  try {
    const response = await fetch(`${API_URL}/blog/${searchString}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to search blogs');
    }

    return response.json();
  } catch (error) {
    console.error('Search blogs error:', error);
    throw error;
  }
};

export const getBlogSummary = async (id) => {
  try {
    const response = await fetch(`${API_URL}/blog/${id}/summary`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to generate summary');
    }

    return response.json();
  } catch (error) {
    console.error('Get blog summary error:', error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await fetch(`${API_URL}/user/${email}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch user');
    }

    return response.json();
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
};

// User Blogs API
export const getUserBlogs = async (page = 1, size = 100) => {
  try {
    // Get the username from localStorage
    const username = localStorage.getItem('username');
    
    if (!username) {
      throw new Error('Username not found in localStorage');
    }
    
    // Use existing getBlogs function to avoid CORS issues
    const blogsData = await getBlogs(page, size);
    
    // Filter blogs by the current user's username (author field)
    const userBlogs = blogsData.items.filter(blog => blog.author === username);
    
    // Return in the same format as the original API response
    return {
      items: userBlogs,
      total: userBlogs.length,
      page: 1,
      size: userBlogs.length,
      pages: 1
    };
  } catch (error) {
    console.error('Get user blogs error:', error);
    throw error;
  }
}; 