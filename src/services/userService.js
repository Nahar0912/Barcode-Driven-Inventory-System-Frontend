import api from "./api";

export const getUser = async () => {
  try {
    const response = await api.get('/users'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching aLL User:', error);
    throw error;
  }
};

export const createUser = async (UserData) => {
  try {
    const response = await api.post('/api/auth/register', UserData);
    console.log("API Response:", response.data); 
    return response.data;
  } catch (error) {
    console.error('Error Creating User:', error);
    throw error;
  }
};