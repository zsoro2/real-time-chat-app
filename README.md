# Real-Time Chat App

This project is a real-time chat application that allows users to communicate through direct chat. Built with Next.js, Node.js, Express, and Socket.IO, it offers a dynamic and responsive user experience.

## Technologies Used

- Frontend: React.js / Next.js / Typescript / Tailwind CSS / shadcn
- Backend: Node.js / Express.js
- Testing: Jest
- Database: MySQL
- Real-Time Communication: Socket.IO
- Authentication: JWT
- Deployment: Docker

## Features

- **User Authentication**: Secure sign-up and login process.
- **Direct Messaging**: Users can send and receive messages in real-time.
- **Live Updates**: Utilizes Socket.IO for instant messaging without needing to refresh the page.

## Files

```bash
real-time-chat-app/
│
├── frontend/                 # Next.js frontend application
│   ├── public/               # Static files like images, fonts, etc.
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Application pages and Next.js routing
│   │   │   ├── api/          # API routes for Next.js (if any)
│   │   │   └── _app.js       # Next.js App component
│   │   ├── styles/           # Global styles and CSS modules
│   │   └── hooks/            # React hooks for shared logic
│   ├── .env.local            # Environment variables for the frontend
│   ├── next.config.js        # Next.js configuration
│   └── package.json          # Frontend dependencies
│
├── backend/                  # Node.js + Express backend application
│   ├── src/
│   │   ├── config/           # Configuration files and environment variable management
│   │   ├── controllers/      # Controllers for handling requests
│   │   ├── middleware/       # Express middleware (authentication, logging, etc.)
│   │   ├── prisma/           # Database models (if using an ORM)
│   │   ├── routes/           # Route definitions
│   │   └── tests/            # Test files
│   ├── .env                  # Environment variables for the backend
│   ├── app.js                # Express app setup
│   └── package.json          # Backend dependencies
│
├── docker-compose.yml        # Docker compose to orchestrate containers
│
└── README.md                 # Project documentation

