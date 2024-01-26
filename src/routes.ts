// routes.ts

import express from 'express';
import * as userController from './controller/userController';

const router = express.Router();

// User routes
router.get('/api/users', userController.getAllUsers);
router.get('/api/users/:id', userController.getUserById);
router.post('/api/users', userController.createUser);
router.put('/api/users/:id', userController.updateUserById);
router.delete('/api/users/:id', userController.deleteUserById);
router.post('/api/users/reset', userController.resetUsersRoute);

export default router;