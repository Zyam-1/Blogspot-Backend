# Blog App Backend

This is the backend for a Blog Application, built using Express.js. It provides APIs for blog creation, user authentication, commenting on blogs, and an admin dashboard for managing all blogs.

## Features

+ User Authentication (Register, Login, Logout)

+ CRUD operations on Blogs (Create, Read, Update, Delete)

+ Commenting System (Users can comment on specific blogs)

+ Admin Dashboard (Admins can view, manage, and delete blogs)

+ Authorization (Only admins can perform certain actions)

## Tech Stack

+ Node.js

+ Express.js

+ MongoDB & Mongoose

+ JWT Authentication

## Installation

1. Clone the repository


```
git clone https://github.com/yourusername/blog-app-backend.git
cd blog-app-backend
```

2. Install dependencies



```
npm install

```

3. Create a config file

```
{  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
}

```

4. Run the server

```
npm start

```

### Authentication

| Method | Endpoint               | Description             |
|-------|------------------------|-------------------------|
| POST  | `/api/auth/register`   | Register a new user     |
| POST  | `/api/auth/login`      | User login              |
| GET   | `/api/auth/logout`     | User logout             |

---

### Blog Routes

| Method | Endpoint               | Description                     |
|-------|------------------------|---------------------------------|
| POST  | `/api/blogs`           | Create a new blog (Auth)        |
| GET   | `/api/blogs`           | Get all blogs                   |
| GET   | `/api/blogs/:id`       | Get a specific blog by ID       |
| PUT   | `/api/blogs/:id`       | Update a blog (Author Only)     |
| DELETE| `/api/blogs/:id`       | Delete a blog (Admin Only)      |

---

### Comment Routes

| Method | Endpoint                     | Description                          |
|-------|------------------------------|--------------------------------------|
| POST  | `/api/comments/:blogId`      | Add a comment to a blog (Auth)       |
| GET   | `/api/comments/:blogId`      | Get all comments for a blog          |
| DELETE| `/api/comments/:id`          | Delete a comment (Admin Only)        |

---

### Admin Routes

| Method | Endpoint                   | Description                     |
|-------|----------------------------|---------------------------------|
| GET   | `/api/admin/blogs`         | View all blogs (Admin)          |
| DELETE| `/api/admin/blogs/:id`     | Delete any blog (Admin)         |
| GET   | `/api/admin/users`         | View all users (Admin)          |

## Authentication & Authorization

+ Users can create blogs, comment, and update their own blogs.

+ Admins have full access to manage blogs and comments.

+ JWT tokens are used for authentication.

## Running in Development Mode

Use 
**nodemon** 
for live-reloading:

```
npm run dev
```



