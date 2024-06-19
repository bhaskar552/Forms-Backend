import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const dbPath = path.join(__dirname, 'db.json');

// Utility function to read data from the JSON file
const readData = () => {
  const rawData = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(rawData);
};

// Utility function to write data to the JSON file
const writeData = (data: any) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// /ping - A GET request that always returns True
router.get('/ping', (req: Request, res: Response) => {
  res.json({ success: true });
});

// /submit - A POST request with parameters "name", "email", "phone", "github_link" and "stopwatch_time"
router.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;

  if (!name || !email || !phone || !github_link || !stopwatch_time) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newSubmission = { name, email, phone, github_link, stopwatch_time };
  const data = readData();
  data.push(newSubmission);
  writeData(data);

  res.json({ success: true });
});

// /read - A GET request with query parameter "index" which is a 0-index for reading the (index+1)th form submission
router.get('/read', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string);

  if (isNaN(index)) {
    return res.status(400).json({ error: 'Index must be a number' });
  }

  const data = readData();

  if (index < 0 || index >= data.length) {
    return res.status(404).json({ error: 'Index out of range' });
  }

  res.json(data[index]);
});

// /delete - A DELETE request with query parameter "index" which deletes the (index+1)th form submission
router.delete('/delete', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string);

  if (isNaN(index)) {
    return res.status(400).json({ error: 'Index must be a number' });
  }

  const data = readData();

  if (index < 0 || index >= data.length) {
    return res.status(404).json({ error: 'Index out of range' });
  }

  data.splice(index, 1);
  writeData(data);

  res.json({ success: true });
});

// /edit - A PUT request with query parameter "index" and body parameters "name", "email", "phone", "github_link" and "stopwatch_time"
router.put('/edit', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string);
  const { name, email, phone, github_link, stopwatch_time } = req.body;

  if (isNaN(index)) {
    return res.status(400).json({ error: 'Index must be a number' });
  }

  const data = readData();

  if (index < 0 || index >= data.length) {
    return res.status(404).json({ error: 'Index out of range' });
  }

  const updatedSubmission = { name, email, phone, github_link, stopwatch_time };
  data[index] = updatedSubmission;
  writeData(data);

  res.json({ success: true });
});

// /search - A GET request with query parameter "email" which returns all form submissions matching the given email
router.get('/search', (req: Request, res: Response) => {
  const email = req.query.email as string;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const data = readData();
  const results = data.filter((submission: any) => submission.email === email);

  if (results.length === 0) {
    return res.status(404).json({ error: 'No submissions found for the given email' });
  }

  res.json(results);
});

export default router;
