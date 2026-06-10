# ThreadJS 🧵

## 📖 Application Overview
[TODO: Explain what the app does, its purpose, and target audience]

## 🏗️ Application Architecture
[TODO: High-level explanation of the Frontend (React/Vite), Backend (Node/Fastify/Knex), and Shared packages]

---

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
