# DevTrack-RIWI-2026

DevTrack is a professional Technical Career Tracking Platform designed specifically for coders to monitor, manage, and accelerate their career progress within the RIWI ecosystem.

This repository houses the complete implementation of the platform, including the backend architecture and authentication mechanisms located under the feature/auth branch.

## Table of Contents

- [About the Project](#about-the-project)
- [Architecture and Project Structure](#architecture-and-project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Authentication Workflow](#authentication-workflow)

## About the Project

DevTrack provides software developers with a structured environment to track technical competencies, career milestones, and educational growth. Built as part of the RIWI training initiative, the system ensures data persistence, secure user interactions, and robust management tools for scalable student tracking.

## Architecture and Project Structure

The project follows a decoupled, modular workspace architecture separating backend business logic from configuration files.

```text
├── backend/            # Backend server source code and logic
├── .gitignore          # Git exclusion rules
├── package.json        # Main project configuration and dependency tree
└── package-lock.json   # Exact dependency locks
```

## Features

- **Decoupled Backend Engine:** Structured codebase contained entirely in the backend/ directory for optimal separation of concerns.
- **Enterprise Authentication (feature/auth):** Implements secure user workflows, access token validation, and session handling routines.
- **Career Path Monitoring:** Custom modules tailored to evaluate technical growth indicators defined by RIWI templates.

## Prerequisites

Before configuring the project locally, ensure your environment meets the following specifications:

- Node.js (version 18.x or higher recommended)
- npm (version 9.x or higher)
- A configured database engine (refer to your local backend environment configuration)

## Installation and Setup

Follow these steps to initialize the development environment locally:

1. Clone the repository and checkout the authentication feature branch:

   ```bash
   git clone https://github.com/sebarebar/DevTrack-RIWI-2026
   cd DevTrack-RIWI-2026
   git checkout feature/auth
   ```

2. Install the core dependencies from the root directory:

   ```bash
   npm install
   ```

3. Navigate to the backend environment to configure its operational modules:

   ```bash
   cd backend
   npm install
   ```

4. Set up your environment variables by creating a `.env` file in the backend/ folder based on your specific requirements (e.g., Database URL, Secret Keys for JWT token signatures).

5. Launch the backend server in development mode:
   ```bash
   npm start
   ```

## Authentication Workflow

The feature/auth branch establishes the programmatic perimeter for user verification. It includes:

- User registration and login processing handlers.
- Secure password hashing mechanisms prior to database storage.
- JSON Web Token (JWT) issuance and validation middleware for protecting restricted API endpoints.




Deployment configured with GitHub Pages.