import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import CSVUpload from './CSVUpload';
import { fetchTasks } from '../services/taskService';
import { Container, Typography, Grid } from '@mui/material';

const Dashboard = ({ socket }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchAllTasks();
    if (socket) {
      socket.on('refresh-tasks', fetchAllTasks);
    }
  }, [socket]);

  const fetchAllTasks = async () => {
    const taskList = await fetchTasks();
    setTasks(taskList);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ my: 4 }}>
        Task Management Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <TaskForm onTaskCreated={fetchAllTasks} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TaskList tasks={tasks} />
        </Grid>
        <Grid item xs={12}>
          <CSVUpload />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
