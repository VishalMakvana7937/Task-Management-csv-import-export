import axios from 'axios';

export const exportTasks = async () => {
  try {
    const { data } = await axios.get('http://localhost:5000/csv/exports', {
      responseType: 'blob',
      headers: { 'x-auth-token': localStorage.getItem('token') },
    });
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tasks.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting tasks:', error);
    throw error;
  }
};

export const importTasks = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    await axios.post('http://localhost:5000/csv/imports', formData, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error importing tasks:', error);
    throw error;
  }
};
