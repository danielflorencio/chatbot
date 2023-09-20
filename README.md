# Chatbot Application

This is an in-development chatbot SaaS application for creating automated message workflows for whatsapp and other platforms.

The repository a monorepo containing both the client and server components of the application. 

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
- React Flow Library (For the bots creation panel)

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
git clone https://github.com/danielflorencio/chatbot-monorepo.git
```

2. Start the development server for both the client and server:
```
cd client
npm run dev
```

3. Then Start a new terminal on your machine, and go to the project's root folder:
```
cd server
npm run dev
```

4. Open your browser and access the client application at `http://localhost:5173/sign-up`.

## Contributing

Contributions to the chatbot application are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.
