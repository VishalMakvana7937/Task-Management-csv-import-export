import axios from 'axios';

export const fetchTasks = async () => {
  const { data } = await axios.get('http://localhost:5000/tasks', {
    headers: { 'x-auth-token': localStorage.getItem('token') },
  });
  return data;
};

export const createTask = async (taskData) => {
  try {
    await axios.post('http://localhost:5000/tasks', taskData, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    });
  } catch (error) {
    console.error('Error creating task:', error);
    throw error; // Re-throw to handle it in the component if needed
  }
};
