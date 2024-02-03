# Dummy API 
A simple app for testing API with dummy data built with Node.js, Express and TypeScript. This application does not use any databases for storage. Instead, it leverages JSON files to persist and update data.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Data Storage](#data-storage)
- [Creating a Data Model](#creating-a-data-model)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)

## Getting Started

### Prerequisites
- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```git clone https://github.com/twelvefusion/dummy-api.git```

2. Install dependencies:
   ```npm install```

## Usage

1. Start the server:
    ```npm start```
    The app will run at [http://localhost:5000](http://localhost:5000). The port can be updated by setting the `PORT` in the `.env` file.

2. Test the API using tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/).

## Data Storage

The data files are located in the directory `data`.

### Data Manipulation

- The app reads data from these JSON files on startup.
- CRUD (Create, Read, Update, Delete) operations manipulate the data in memory.
- Changes made during runtime are written back to the respective JSON files.

**Note:** This approach is suitable for development environments and small-scale applications as a testing tool to your api applications. For larger-scale applications and production environments, consider using a database for efficient data management.

## Sample Endpoints

- Get All Users:
  - Endpoint: `GET /api/users`
  - Description: Get a list of all users.

- Get User by ID:
  - Endpoint: `GET /api/users/:id`
  - Description: Get details of a specific user by ID.

- Create User:
  - Endpoint: `POST /api/users`
  - Description: Create a new user.
  - Request Body: JSON object with user details.

- Update User:
  - Endpoint: `PUT /api/users/:id`
  - Description: Update details of a specific user by ID.
  - Request Body: JSON object with updated user details.

- Delete User:
  - Endpoint: `DELETE /api/users/:id`
  - Description: Delete a specific user by ID.

- Reset API Data:
  - Endpoint: `POST /api/users/reset`
  - Description: Resets the api data to the initial user data.

## Creating a Data Model

1. **Create a New Model File:**

   In the project directory, create a new file for your model. For example, if you're creating a "Post" model, you might create a file named `postModel.ts`.

   ```typescript
   // postModel.ts

   export interface Post {
     id: number;
     title: string;
     content: string;
   }
   ```
   Define the properties that your model should have. In this example, a `Post` has an `id`, `title`, and `content`.

2.	**Update Controller to Use the New Model:**
If you want to create CRUD operations for the new model, you’ll need to create the controller class for that model and extend extend it with the `GenericController`. In the `Post` model example, create a `PostController` class and extend it with the `GenericController` class from the `BaseController`.
```
// postController.ts

import { GenericController } from './baseController';
import { Post } from './postModel';

class PostController extends GenericController<Post> {
  constructor(fileName: string, initialData?: Post[]) {
    super(fileName, initialData);
    this.loadInitialData();
  }

  private loadInitialData() {
	// Add any specific initialization logic for posts if needed 
  }
}
```

Create a new instance of the `PostController` class with a `posts.json` data file and export its methods. 

```
const postController = new PostController('data/posts.json'); 

export  const getAllPosts = postController.getAll; 
export  const getPostById = postController.getById; 
export  const createPost = postController.create; 
export  const updatePostById = postController.updateById; 
export  const deletePostById = postController.deleteById; 
export  const resetPostsRoute = postController.resetRoute;
```
Update the properties and methods based on the structure of your new model.

**Note:** If a `posts.json`file does not exists, one will be created when a new instance of the `postController` is created.

3. **Update Routes to Include the New Model:**

If you want to expose endpoints for the new model, update the `routes.ts` file to include the following:

```
// Import the new controller
import * as postController from  './controller/postController';

// Define the Post routes using the postController methods
router.get('/api/posts', postController.getAllPosts);
router.get('/api/posts/:id', postController.getPostById);
router.post('/api/posts', postController.createPost);
router.put('/api/posts/:id', postController.updatePostById);
router.delete('/api/posts/:id', postController.deletePostById);
router.post('/api/posts/reset', postController.resetPostRoute);
```

## Project Structure

- `src/` - Project directory for the app's main source files
  - `index.ts` - Main entry point for the application.
  - `controller/` - Controller directory 
    - `baseController.ts` - Generic controller class for CRUD operations
  - `util/` - Utility directory
	  - `jsonUtil` - Utility file for reading and writing json files
-  `data/`: Contains the json data files.

## Dependencies

- [express](https://www.npmjs.com/package/express): Web framework for Node.js.
- [body-parser](https://www.npmjs.com/package/body-parser): Middleware to parse incoming request bodies.
