# Vizmo-Backend-Assignment

# Blog Post REST API

## Overview

Implemented a REST API backend to handle CRUD operations for blog posts. Each blog post should include a title, optional images, content, and be associated with a single user (author). Users can sign up, log in, and manage their blog posts through the API.

### Tech Stack

- **Node.js**: JavaScript runtime for building the backend server.
- **Express.js**: Web application framework for Node.js for building RESTful APIs.
- **PostgreSQL**: Relational database for storing user and blog post data.
- **Supabase**: Managed PostgreSQL database service used for the database backend.
- **Prisma**: ORM for interacting with the PostgreSQL database.
- **JWT (JSON Web Token)**: For user authentication and authorization.

## Authentication

- **User Login and Signup**: Users can create an account or log into an existing one to manage their blog posts.

### Authentication Endpoints

#### User Signup

- **POST** `/api/auth/signup`
  - Sign up a new user.
  - **Body**: `{ "username": "string", "email": "string", "password": "string" }`
  - **Response**: `{ "message": "User registered successfully." }`

#### User Login

- **POST** `/api/auth/login`
  - Log in an existing user.
  - **Body**: `{ "email": "string", "password": "string" }`
  - **Response**: `{ "token": "string" }`

## REST API Endpoints

**Header**: Add `Authorization: Bearer <token>` to the request header for each Blog endpoint. Replace `<token>` with the JWT token obtained from the login endpoint.

### Blog Posts

#### Get All Blog Posts

- **GET** `/api/blogs`
  - Retrieves a list of all blog posts.
  - **Response**: Returns an array of blog posts.

#### Get Details of a Single Blog Post

- **GET** `/api/blogs/:id`
  - Retrieves details of a specific blog post by `id`.
  - **Response**: Returns the details of the blog post.

#### Create a New Blog Post

- **POST** `/api/blogs`
  - Creates a new blog post.
  - **Body**: `{ "title": "string", "content": "string", "images": ["string"], "authorId": "string" }`
  - **Response**: Returns the created blog post.

#### Update an Existing Blog Post

- **PUT** `/api/blogs/:id`
  - Updates an existing blog post by `id`.
  - **Body**: `{ "title": "string", "content": "string", "images": ["string"] }`
  - **Response**: Returns the updated blog post.

#### Delete an Existing Blog Post

- **DELETE** `/api/blogs/:id`
  - Deletes a blog post by `id`.
  - **Response**: Returns a success message.

#### Get Filtered List of Posts

- **GET** `/api/blogsFilter?title=string&content=string&authorName=string`
  - Retrieves a list of blog posts filtered by `title` and `author`.
  - **Query Parameters**:
    - `title`: (Optional) Filter by post title.
    - `author`: (Optional) Filter by author’s username or ID.
  - **Response**: Returns a filtered list of blog posts.

## Schema

### Blog Post

- **Title**: `string` - The title of the blog post.
- **Content**: `string` - The main content of the blog post.
- **Images**: `array of strings` - URLs or paths to images associated with the post.
- **AuthorId**: `string` - ID of the user who authored the blog post.

### User (Author)

- **Username**: `string` - The username of the user.
- **Email**: `string` - The email address of the user.
- **Password**: `string` - The password for the user account.

- Refer to `prisma/schema.prisma` for more details

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Enigma-52/Vizmo-Backend-Assignment
   cd blog-post-api
   ```
2. Install Dependencies
  
  ```bash
  npm install
  ```

3. Configure Environment Variables

  Create a .env file and add:
  
  ```bash
  DATABASE_URL=your-database-url
  DIRECT_URL=your-direct-url
  JWT_SECRET=your-jwt-secret
  PORT=PORT-NUMBER
  ```

4. Run Migrations
  
  ```bash
  npx prisma migrate dev --name init
  ```
5. Generate Prisma Client:

```bash
npx prisma generate
```

6. Start the Server

```bash
npm start
```
