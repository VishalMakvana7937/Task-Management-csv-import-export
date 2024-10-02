const Task = require('../models/Task');
const csv = require('csv-parser');
const { Parser } = require('json2csv');

exports.exportTasks = async (req, res) => {
  // ... (same as before)
};

exports.importTasks = (req, res) => {
  const fileRows = [];
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const stream = req.file.buffer ?
    require('stream').Readable.from(req.file.buffer) :
    req.file;

  stream
    .pipe(csv())
    .on('data', (row) => {
      // Validate the row before pushing it
      const { dueDate, category, description } = row;

      if (!dueDate || !category || !description) {
        console.warn(`Missing fields in row: ${JSON.stringify(row)}`);
        return; // Skip this row if required fields are missing
      }

      // Add the validated row to fileRows
      fileRows.push(row);
    })
    .on('end', async () => {
      try {
        if (fileRows.length === 0) {
          return res.status(400).json({ message: 'No valid tasks to import' });
        }
        await Task.insertMany(fileRows);
        res.json({ msg: 'Tasks imported successfully' });
      } catch (insertError) {
        console.error('Error inserting tasks:', insertError);
        res.status(500).json({ message: 'Failed to import tasks' });
      }
    })
    .on('error', (error) => {
      console.error('Error parsing CSV:', error);
      res.status(500).json({ message: 'Error parsing CSV' });
    });
};
