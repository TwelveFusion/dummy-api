// userController.ts

import { Request, Response } from 'express';
import { readJsonFile, writeJsonFile } from '../util/jsonUtil';

// Read data from JSON file
let users: any[] = [];

// Read initial data on startup
users = readJsonFile('users.json');

const writeUsersToFile = () => {
  writeJsonFile('users.json', users);
};

export const getAllUsers = async (req: Request, res: Response) => {
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  // Update JSON file
  writeUsersToFile();

  res.status(201).json(newUser);
};

export const updateUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const { name } = req.body;

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], name };

    // Update JSON file
    writeUsersToFile();

    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  users = users.filter((u) => u.id !== userId);

  // Update JSON file
  writeUsersToFile();

  res.json({ message: 'User deleted successfully' });
};
