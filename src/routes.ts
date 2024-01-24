// routes.ts

import express from 'express';
import * as userController from './controller/userController';

const router = express.Router();

// Read all users
router.get('/api/users', userController.getAllUsers);

// Read user by ID
router.get('/api/users/:id', userController.getUserById);

// Create a new user
router.post('/api/users', userController.createUser);

// Update user by ID
router.put('/api/users/:id', userController.updateUserById);

// Delete user by ID
router.delete('/api/users/:id', userController.deleteUserById);

export default router;