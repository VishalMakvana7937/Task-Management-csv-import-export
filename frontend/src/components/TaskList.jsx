import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const TaskList = ({ tasks }) => (
  <List>
    {tasks.map((task) => (
      <ListItem key={task._id}>
        <ListItemText
          primary={task.description}
          secondary={`Category: ${task.category}, Status: ${task.status}`}
        />
      </ListItem>
    ))}
  </List>
);

export default TaskList;
