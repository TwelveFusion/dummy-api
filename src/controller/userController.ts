// userController.ts

import { GenericController, BaseModel } from './baseController';

interface User extends BaseModel {
  name: string;
}

class UserController extends GenericController<User> {}

const userController = new UserController('users.json');

export const getAllUsers = userController.getAll;
export const getUserById = userController.getById;
export const createUser = userController.create;
export const updateUserById = userController.updateById;
export const deleteUserById = userController.deleteById;
export const resetUsersRoute = userController.resetRoute;