// index.ts

import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import { readJsonFile, writeJsonFile } from './util/jsonUtil';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Apply routes
app.use(routes);

// Read initial data on startup
const initialUsers = readJsonFile('data/users.json');

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