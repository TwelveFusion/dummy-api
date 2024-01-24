import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Dummy data
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
];

// Read all users
app.get('/api/users', (req: Request, res: Response) => {
    res.json(users);
});

// Read user by ID
app.get('/api/users/:id', (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Create a new user
app.post('/api/users', (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const newUser = {
        id: users.length + 1,
        name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// Update user by ID
app.put('/api/users/:id', (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const { name } = req.body;

    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], name };
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Delete user by ID
app.delete('/api/users/:id', (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);

    users = users.filter((u) => u.id !== userId);
    res.json({ message: 'User deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});