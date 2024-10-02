import axios from 'axios';

export const register = async (email, password) => {
  const { data } = await axios.post('http://localhost:5000/auth/register', {
    email,
    password,
  });
  localStorage.setItem('token', data.token);
  return data.user;
};

export const login = async (email, password) => {
  const { data } = await axios.post('http://localhost:5000/auth/login', {
    email,
    password,
  });
  localStorage.setItem('token', data.token);
  return data.user;
};
