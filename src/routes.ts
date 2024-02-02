// routes.ts

import express from 'express';
import * as userController from './controller/userController';
import * as postController from './controller/postController';
import * as webpageController from './controller/webpageController';

const router = express.Router();

// User routes
router.get('/api/users', userController.getAllUsers);
router.get('/api/users/:id', userController.getUserById);
router.post('/api/users', userController.createUser);
router.put('/api/users/:id', userController.updateUserById);
router.delete('/api/users/:id', userController.deleteUserById);
router.post('/api/users/reset', userController.resetUsersRoute);

// Post routes
// Post routes
router.get('/api/posts', postController.getAllPosts);
router.get('/api/posts/:id', postController.getPostById);
router.post('/api/posts', postController.createPost);
router.put('/api/posts/:id', postController.updatePostById);
router.delete('/api/posts/:id', postController.deletePostById);

router.get('/api/web', webpageController.getData);

export default router;