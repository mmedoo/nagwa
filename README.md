# Nagwa Todo App

Nagwa Todo is a feature-rich task management application built with React, Redux, and TypeScript. It allows users to create, manage, and organize their tasks efficiently. The app supports user authentication, task completion tracking, and persistent storage.


# Features

## 1. **User Authentication**
- **Login and Logout**: Users can securely log in and log out.
- **Remember Me**: Option to persist sessions for 7 days.
- **Authentication State**: Managed securely using cookies.

## 2. **Task Management**
- **Create, Update, and Delete Tasks**: Users can manage tasks within lists.
- **Mark Tasks as Completed**: Toggle task completion status.
- **Drag-and-Drop**: Reorder tasks within a list.
- **Keyboard Shortcuts**:

   | Shortcut         | Action                     |
   |------------------|----------------------------|
   | `Ctrl/Cmd + B`   | Add a new task             |
   | `Arrow Up/Down`  | Navigate between tasks     |
   | `E or Enter`     | Edit the selected task     |
   | `Space`          | Toggle task completion     |
   | `Delete`         | Delete the selected task   |


## 3. **List Management**
- **Create and Delete Lists**: Users can manage multiple task lists.
- **Completion Tracking**: View the percentage of completed tasks in each list.

## 4. **Task Details**
- **Edit Task Details**: Modify task title, description, and completion status.
- **Auto-Save**: Changes are saved in real-time.

## 5. **Persistent Storage**
- **Backend Integration**: Data is stored in a SQLite database.
- **Real-Time Sync**: Tasks and lists are synced with the backend.

## 6. **Responsive Design**
- Fully responsive UI for seamless usage across devices.
- Clean and modern design with intuitive navigation.

## 7. **Error Handling**
- **404 Page**: For invalid routes.
- **Form Validation**: Ensures valid inputs for login and task creation.


# Tech Stack

## Frontend
- **React**: Component-based UI library.
- **React Router**: Declarative routing for navigation.
- **Redux Toolkit**: State management for tasks, lists, and authentication.
- **TypeScript**: Strongly typed JavaScript for better code quality.
- **CSS Modules**: Scoped styling for components.

## Backend
- **Express.js**: Lightweight web framework for API development.
- **Sequelize**: ORM for database management.
- **SQLite**: Lightweight database for persistent storage.
- **JWT**: Secure user authentication.

## Build Tools
- **Vite**: Fast and modern build tool for development and production.
- **ESLint**: Linting and code quality enforcement.
- **TypeScript Compiler**: For type checking and transpilation.


# Project Structure

## Frontend
```
frontend Mocking/
├── src/
│   ├── app/                # Redux store and utilities
│   ├── components/         # Reusable UI components
│   ├── features/           # Redux slices and actions
│   ├── routes/             # Application routes (Home, Auth, List, NotFound)
│   ├── types.ts            # TypeScript type definitions
│   ├── main.tsx            # Application entry point
│   ├── index.css           # Global styles
├── public/                 # Static assets
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
```

## Backend
```
backend/
├── src/
│   ├── app.ts              # Express app configuration
│   ├── db.ts               # Sequelize database connection
│   ├── models/             # Sequelize models (User, Todos)
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Authentication middleware
│   ├── routes/             # API routes
│   ├── data/               # Static data (e.g., default todos)
│   ├── types/              # TypeScript type definitions
│   ├── index.ts            # Application entry point
├── database.sqlite         # SQLite database file
├── tsconfig.json           # TypeScript configuration
```


# Installation and Setup

## Steps
1. Install dependencies for both frontend and backend:
   ```bash
   npm install
   ```

2. Start the development servers:
   ```bash
   npm run review
   ```

3. Open the app in your browser at [http://localhost:5173](http://localhost:5173).


# API Endpoints

## User Routes
### **POST `/user/register`**
Register a new user.
### **POST `/user/login`**
Log in a user.
### **GET `/logout`**
Log out the current user.
### **GET `/me`**
Fetch the authenticated user's details.

## Todos Routes
### **GET `/todos`**
Fetch the user's todos.
### **PUT `/todos`**
Update the user's todos.



# Scripts

## Frontend
- `npm run dev`: Start the development server.
- `npm run build`: Build the app for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code quality issues.

## Backend
- `npm run dev`: Start the development server with hot reloading.
- `npm run start`: Start the production server.


# Routes

### **`/`**
The home page displays all task lists and their completion percentages. Users can navigate to individual lists or create new ones.

### **`/:listId/:taskId?`**
This route allows users to view and manage tasks within a specific list. If a `taskId` is provided, the task details page is displayed, enabling users to edit the task's title, description, and status. A progress bar visually represents the proportion of completed tasks within the list.

### **`/auth/login`**
The login page provides user authentication functionality. Users can log in with their credentials to access their tasks and lists.

### **`/auth/signup`**
The signup page allows new users to create an account.

### **`/auth/signout`**
This route logs the user out of the application, clearing their session and redirecting them to the login page.

### **`/404`**
A custom 404 page for invalid routes.
