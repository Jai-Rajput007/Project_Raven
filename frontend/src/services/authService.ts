export const loginUser = async (email: string, password: string) => {
    // Mocking a login API call
    if (email === 'admin@example.com' && password === 'password') {
      return { name: 'Admin', email };
    }
    alert('Invalid credentials');
    return null;
  };
  
  export const signupUser = async (email: string, password: string) => {
    // Mocking signup (can be replaced with real API)
    return { name: 'New User', email };
  };
  