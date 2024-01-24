# Dummy API 

A simple app for testing with API data built with Node.js, Express and TypeScript.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Dependencies](#dependencies)

## Getting Started

### Prerequisites

- Node.js (version X.X.X)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/twelvefusion/dummy-api.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:
    ```
   npm start
   ```

The app will run at [http://localhost:5000](http://localhost:5000).

2. Test the API using tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/).

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

## Project Structure

- **`src/`**: Contains your TypeScript source files.
  - `index.ts`: Main entry point for your application.
  - Other source files...

- **`dist/`**: Contains the compiled JavaScript files (generated after running `npm run build`).

## Scripts

- `npm start`: Start the server.
- `npm run build`: Compile TypeScript files into JavaScript (for production).
- `npm run dev`: Start the server in development mode with automatic restarts (using ts-node).

## Dependencies

- [express](https://www.npmjs.com/package/express): Web framework for Node.js.
- [body-parser](https://www.npmjs.com/package/body-parser): Middleware to parse incoming request bodies.
