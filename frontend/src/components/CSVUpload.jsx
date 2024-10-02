import React, { useState } from 'react';
import { exportTasks, importTasks } from '../services/csvService';
import { Button, Snackbar, Alert } from '@mui/material';

const CSVUpload = () => {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await importTasks(file);
        // Optionally show success message
        alert('Tasks imported successfully!');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to import tasks');
        setOpen(true);
      }
    }
  };

  const handleExport = async () => {
    try {
      await exportTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to export tasks');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" component="label">
        Upload CSV
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleExport}
        sx={{ ml: 2 }}
      >
        Export Tasks as CSV
      </Button>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CSVUpload;
