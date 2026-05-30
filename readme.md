# ThreadJS

## Description

[**Thread**](git@github.com:BinaryStudioAcademy/thread-js.git) - this is [SPA](https://medium.com/NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58 'SPA') with a ready-made architecture and structure, a connected basic technology stack and start-up functionality, designed for individual practice of students.

The main idea of the project is to onboard students with our vision of how a real project should look like from the inside, and give them the opportunity to individually explore how the architecture and structure of the project works, see its possible configurations, try to deeply understand someone else's code.

### Useful Links

- Pay attention, that we have certain [quality criteria](https://github.com/BinaryStudioAcademy/quality-criteria/blob/production/src/javascript.md), which we should follow during application development.

### Requirements

- [NodeJS](https://nodejs.org/en) (24.16.x);
- [npm](https://www.npmjs.com/) (11.16.x);
- [PostgreSQL](https://www.postgresql.org/) (15.5)

## Technologies

The main frameworks and libraries used in the project are listed here. A complete list of technologies used for each part of the project is in the `package.json` files in the `apps/frontend` and `apps/backend` folders.

### Global

#### Technologies

1. [Typescript](https://www.typescriptlang.org/)
2. [npm workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces)

### Frontend

#### Technologies

1. [React](https://react.dev/) — a frontend library
2. [Redux](https://redux.js.org/) + [Redux Toolkit](https://redux-toolkit.js.org/) — a state manager

#### Folder Structure

1. assets - static assets (images, global styles)
2. libs - shared libraries and utilities

   2.1 components - plain react components

   2.2 enums

   2.3 helpers

   2.4 hooks

   2.5 modules - separate features or functionalities

   2.6 types

3. modules - separate app features or functionalities
4. pages - app pages

### Backend

#### Technologies

1. [Fastify](https://fastify.dev/) — a backend framework
2. [Knex](https://knexjs.org/) — a query builder
3. [Objection](https://vincit.github.io/objection.js/) — an ORM

#### Folder Structure

1. db - database data (migrations, seeds)
2. libs - shared libraries and utilities

   2.1 enums

   2.2 exceptions

   2.3 helpers

   2.4 modules - separate features or functionalities

   2.5 types

3. modules - separate app features or functionalities

### Shared Package

#### Reason

As we are already using js on both frontend and backend it would be useful to share some contracts and code between them.

## Installation

1.  Get [Node.js](https://nodejs.org/en/ 'Node.js') (LTS) the version included into [.nvmrc file](./.nvmrc). **Note:** npm will be installed automatically. Check the correctness of the installation: to do this, run in the command line (terminal):

    ```
    node -v  // for checking Node.js version
    npm -v // for checking npm version
    ```

2.  Get the latest stable version [PostgreSQL](https://www.postgresql.org/download/ 'PostgreSQL') for your OS. Check the correctness of the work - try to create a database, a table - for this you can use [pgAdmin](https://www.pgadmin.org/ 'pgAdmin') or any other convenient way you find.

3.  Create in PostgreSQL 2 **empty** databases for the project. For example, _thread_ and _thread-test_. The main idea is that you can check if code works properly in 2 ways: automated via backend tests and manually via interaction between frontend and backend. And these are independent processes.

4.  Install Git.

    **Note**: If you are using Windows, do these two additional steps before cloning the repo:

- Change `eol` setting in your code editor to `lf`.
- Change the `autocrlf` setting to `input` in the Git settings:

  ```
  git config --global core.autocrlf input
  ```

5.  Clone project`s [repo](https://github.com/BinaryStudioAcademy/thread-js):

    ```
    git clone git@github.com:BinaryStudioAcademy/thread-js.git
    ```

6.  **Create a repo at [Bitbucket](https://bitbucket.org/) and carry out further development there.**

## How to Run

### Manually

1. Create and fill all .env files. These files are:

- apps/frontend/.env
- apps/backend/.env

You should use .env.example files as a reference.

1. Install dependencies: `npm install`.

2. Install pre-commit hooks: `npx simple-git-hooks`. This hook is used to verify code style on commit.

3. Run database. You can run it by installing postgres on your computer.

4. Apply migrations: `npm run migrate:dev -w apps/backend`

5. Run backend: `npm run start:dev -w apps/backend`

6. Run frontend: `npm run start:dev -w apps/frontend`

This project has a strong configuration with linters so to make sure that while are you using vs code as an editor you will have the ability to make is visible not only terminal just add this setting locally into repository:

Create a file .vscode/settings.json

```
{
  "eslint.useFlatConfig": true,
  "eslint.workingDirectories": [
    "./",
    { "pattern": "./packages/**/" },
    { "pattern": "./apps/**/" }
  ],
  "eslint.options": {
    "overrideConfigFile": "eslint.config.js"
  }
}

```

## Development Flow

### Pull Request Flow

```
<type>: <ticket-title> <project-prefix>-<issue-number>
```

For the full list of types check [Conventional Commits](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)

Examples:

- `feat: add dashboard screen thjs-123`

### Branch Flow

```
<issue-number>-<type>-<short-desc>
```

Examples:

- `123-feat-add-dashboard`
- `12-feat-add-user-flow`
- `34-fix-user-flow`

### Commit Flow

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0) to handle commit messages

```
<type>: <description> <project-prefix>-<issue-number>
```

Examples:

- `feat: add dashboard component thjs-45`
- `fix: update dashboard card size thjs-212`

## PS

The entire list of tasks can be found on the [**Issues**](https://github.com/BinaryStudioAcademy/thread-js/issues) You can sort only usefull ones by `ready-for-student` label. These tasks are grouped with must-have(with current label) and optional.

## PAY ATTENTION!!!

The task will be considered completed if it is fully completed, the feature works, and whether the correct design following the `Development Flow` was implemented by you. So to pass criteria you should include The Pull Request with direction to the default branch, proper naming of the branch, commits, PR title, and filled description of what was done there. Let's look at its implementation and evaluate whether the logic was distributed correctly in the project. This will show how much you understand the architecture. We will also comment on the code...

The main result of the work can be determined by how deeply you were able to understand the project and how far you have advanced in personal learning.

## FAQ:

1. What frameworks, libraries and their features can be used?

Complete freedom of action, feel free to use whatever you want.

2. Is it possible to change the database (add columns, tables)?

It is possible, and in some tasks it is even necessary. To do this, you need to create new migrations. **Existing migrations cannot be changed!!!** Please do not forget it.
