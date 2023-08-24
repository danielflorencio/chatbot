# Chatbot Application

This is a monorepo containing both the client and server components of a chatbot application. 
The client is built with React, TypeScript, Material UI, and Redux Toolkit...
While the server is built with Node.js, Express.js, TypeScript, and JSON Web Token (JWT) for authentication. 
The application uses a MongoDB database and NPM as the package manager.

## This Readme file is still being written.

## Complete features

- Authentication: Secure user authentication using JWT for protected routes and personalized experiences.
- Persistent Data: Store and retrieve chat conversations and in the MongoDB database.
- Customer Simulator: Send messages as both the Admin and a customer in the main Chats page. 

## Features currently in development

- Bots creation where the user can automate responses and message-flows.

## Planned features for development

- Better user registration with more complete information gathering.
- Main Admin user and Sub Admin user permissions and management. 

## Tech Stack

### Client

- React
- TypeScript
- Material UI
- Redux Toolkit
- Cypress (End-to-End Tests)
- Jest + React Testing Library (Unit and Integration Tests)
- Vite (Build Tool)

### Server

- Node.js
- Express.js
- TypeScript
- MongoDB (Database)
- JSON Web Token (JWT)

## Getting Started

To get started with the chatbot application, follow the instructions below:

### Prerequisites

- Have both MongoDB and NPM running on your machine.

### Installation

1. Clone the repository:

```shell
git clone [[repository-url]](https://github.com/danielflorencio/chatbot-monorepo.git)https://github.com/danielflorencio/chatbot-monorepo.git
```

2. Start the development server for both the client and server:
```
cd client
npm run dev
```
- Then Start a new terminal on your machine, go to the project's root folder:
```
cd server
npm run dev
```

