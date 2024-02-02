// index.ts

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import { readJsonFile, writeJsonFile } from './util/jsonUtil';

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors({
    origin: '*', // Set the allowed origin to '*'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and HTTP authentication
}));

// Parse JSON requests
app.use(express.json());

// Apply routes
app.use(routes);

// Read initial data on startup
const initialUsers = readJsonFile('users.json');

// Write initial data to the file (if it doesn't exist)
if (initialUsers.length === 0) {
  writeJsonFile('users.json', [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ]);
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});