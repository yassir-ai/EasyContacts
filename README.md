# Contact List Application

This is a simple Contact List application built as a project. The application allows users to register, log in, and manage their personal contact lists. Each user has their own private contact list that is securely stored in a database.

## Features

- **User Authentication**: Users can register and log in securely.
- **Personalized Contact List**: Each user has access to their own private list of contacts.
- **CRUD Operations**: Users can Create, Read, Update, and Delete contacts.
- **Responsive Frontend**: A modern and responsive user interface built with React.
- **Dockerized Setup**: The project includes a Docker Compose setup to easily run the application.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Framework for building the API.
- **SQLite**: Lightweight SQL database for storing user data and contact information.

### Frontend
- **React.js**: JavaScript library for building the user interface.
- **Redux**: State management for handling user data and application state.

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user.
- `POST /api/login` - Log in an existing user.

### Contacts
- `GET /api/contacts` - Get the logged-in user’s contacts.
- `POST /api/contacts` - Add a new contact.
- `PUT /api/contacts/:id` - Update an existing contact.
- `DELETE /api/contacts/:id` - Delete a contact.

# Javascript Project

## Project Structure

The ``docker-compose.yml`` file is used to start a number of Docker containers.

* The ``proxy`` container is an HTTP proxy. The solution used is [nginx](https://www.nginx.com/)

## Running the Project

To run the project, you need to copy the ``.env.sample`` file to ``.env`` and fill it in with the correct values.

To start the project, you need to execute the command ``docker-compose up --build``
