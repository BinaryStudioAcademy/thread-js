# ThreadJS 🧵

## 📖 Application Overview
ThreadJS is a full-stack social media web application where users can share text-based posts, engage in discussions, and interact with other users' content. It serves as an educational repository designed to simulate a real-world enterprise development environment. Key features include user authentication, creating threads, commenting, and liking posts.

## 🏗️ Application Architecture
The project is built as a **Monorepo** using npm workspaces, separating the code into three distinct packages:

* **Frontend (`apps/frontend`)**: A React application built with Vite. It handles the user interface, state management, and client-side routing.
* **Backend (`apps/backend`)**: A RESTful API server built with Node.js and Fastify. It manages business logic, handles database operations using Knex.js, and serves data to the frontend.
* **Shared (`packages/shared`)**: A common library containing TypeScript interfaces, types, and validation schemas (e.g., Joi/Zod) used by both the frontend and backend to ensure data consistency.
* **Database**: PostgreSQL is used as the primary relational database to store users, threads, comments, and likes.

## ⚙️ Technical Requirements & Setup

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
* **Node.js**: v24.x or higher
* **npm**: v11.13.x or higher
* **PostgreSQL**: Installed and running locally

### 1. Database Configuration
1. Open pgAdmin or your PostgreSQL CLI.
2. Create two new databases: `thread` and `thread-test`.
3. **Windows Users**: Ensure your `pg_hba.conf` file allows local connections. Set your local IPv4 (`127.0.0.1/32`) and IPv6 (`::1/128`) methods to `trust`.

### 2. Environment Variables
The project requires environment variables for both the frontend and backend.

**Backend:**
1. Navigate to `apps/backend/`.
2. Duplicate `.env.example` and rename the copy to `.env`.
3. Open `.env` and update `DB_PASSWORD` to match your local Postgres password, and ensure `TEST_DB_NAME` is set to `thread-test`.

**Frontend:**
1. Navigate to `apps/frontend/`.
2. Duplicate `.env.example` and rename the copy to `.env`. The default values are already configured for local development.

### 3. Installation & Database Migrations
Open your terminal in the root directory of the project and run the following commands:

```bash
# Install all project dependencies
npm install

# Initialize git hooks for commit formatting
npx simple-git-hooks

# Run database migrations to build the tables
npm run migrate:dev -w apps/backend
