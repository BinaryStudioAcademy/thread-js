# ThreadJS

## Description

[**Thread**](git@github.com:BinaryStudioAcademy/thread-js.git) - this is [SPA](https://medium.com/NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58 'SPA') with a ready-made architecture and structure, a connected basic technology stack and start-up functionality, designed for individual practice of students.

The main theme of the project is a social network similar to Twitter.

The main idea of the project is to onboard students with our vision of how a real project should look like from the inside, and give them the opportunity to individually explore how the architecture and structure of the project works, see its possible configurations, try to deeply understand someone else's code.

## Technologies

The main frameworks and libraries used in the project are listed here. A complete list of technologies used for each part of the project is in the `package.json` files in the `client` and `server` folders.

### Common

1. ESLatest
2. [Typescript](https://www.typescriptlang.org/)
3. [Git](https://git-scm.com/doc)
4. [REST API](https://www.restapitutorial.com/lessons/restquicktips.html)
5. [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token)
6. [Socket.IO](https://socket.io/docs/)
7. [npm](<https://en.wikipedia.org/wiki/Npm_(software)>)
8. [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
9. [ESLint](https://eslint.org/docs/user-guide/getting-started)
10. [joi](https://www.npmjs.com/package/joi)
11. [dayjs](https://day.js.org/)

### Frontend

1. [React](https://reactjs.org/docs/getting-started.html)
2. [Vite](https://vitejs.dev/)
3. [React Redux](https://redux.js.org/introduction/getting-started)
4. [React Hook Form](https://react-hook-form.com/get-started)
5. [history](https://www.npmjs.com/package/history)

### Backend

1. [Node.js](https://nodejs.org/en/)
2. [Fastify](https://www.fastify.io/docs/v3.24.x/)
3. [Knex](https://knexjs.org/)
4. [Objection](https://vincit.github.io/objection.js/)
5. [axios](https://www.npmjs.com/package/axios)
6. [bcrypt](https://www.npmjs.com/package/bcrypt)
7. [nodemon](https://www.npmjs.com/package/nodemon)
8. [dotenv](https://www.npmjs.com/package/dotenv)
9. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
10. [jest](https://www.npmjs.com/package/jest)

### Database

1. [PostgreSQL](https://www.postgresql.org/download/ 'PostgreSQL')

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

### Root of project

1.  In the root of the project, install all the dependencies with command:

    ```
    npm install
    ```

2.  After installing the packages, in the root of the project, you need to run the command to [git-hooks](https://www.npmjs.com/package/simple-git-hooks):

    ```
    npx simple-git-hooks
    ```

    **Now, for each of your commits, the linter will be launched and check your code. It's very important and must have thing, developer should follow linter instructions, without it the PR cannot be merged in real life(IN YOUR CASE, THE WORK MAY NOT BE PROPERLY EVALUATED)**

### Backend

1.  In the command line (terminal) go to the folder server:

    ```
    cd /* path to server folder */
    ```

2.  In the server folder create a file **.env** and copy the contents of the file **.env.example** into it.

    **Note**: file **.env** contains real project keys and should not be saved to the repository.

    Replace in file **.env** key values to real.
    In order to specify the keys for Gyazo Storage, you need to register on the site [Gyazo](https://gyazo.com/captures) and [register the app](https://gyazo.com/oauth/applications). Then, in **.env** use `access token` from the recently created application to Gyazo.

3.  Run [migrations](https://knexjs.org/#Migrations) and seeds to populate the database with demo data. To do this, in the command line (terminal) in the server folder, run:

    ```
    npm run migrate:dev
    npm run seed:run
    ```

    Check the database for demo data.

4.  To start the server in the command line (terminal) in the server folder, run:

    ```
    npm run start:dev
    ```

5.  To test the correct completing the task in the command line (terminal) in the server folder, run:
    ```
    npm run test:${task key}
    ```
    For example: `dislike post` task
    ```
    npm run test:dislike-post
    ```
    Pay attention! During development, tests from previous tasks may be failled, this is an expected behavior, focus on those that correspond to the current task.

### Frontend

1.  In the command line (terminal) go to the `client` folder:

    ```
    cd /* path to client folder */
    ```

2.  In the `client` folder create a file **.env** and copy the contents of the file into it **.env.example**.

    **Note**: file **.env** contains real project keys and should not be saved to the repository.

    Replace in file **.env** key values to real.

3.  To run the client from the command line (terminal) in the client folder, run:

    ```
    npm run start:dev
    ```

    The app should automatically open in your default browser.

### 🥊 Code quality

- [simple-git-hooks](https://www.npmjs.com/package/simple-git-hooks) — a tool that lets you easily manage git hooks.
- [lint-staged](https://www.npmjs.com/package/lint-staged) — run linters on git staged files.
- [dangerjs](https://danger.systems/js/) — automate common code review chores.
- [commitlint](https://commitlint.js.org/) — helps your team adhere to a commit convention.
- [editorconfig](https://editorconfig.org/) — helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
- [prettier](https://prettier.io/) — an opinionated code formatter.
- [ls-lint](https://ls-lint.org/) — file and directory name linter.
- [eslint](https://eslint.org/) — find problems in your JS code.
- [stylelint](https://stylelint.io/) — find and fix problems in your CSS code.

## 🧑‍💻 CI

### 🗞 Git

#### 🏅 Pull Request flow

```
<project-prefix>-<issue-number>: <ticket-title>
```

##### Example

- `thjs-5: Add Clinician Dashboard`

#### 🌳 Branch flow

```
<type>/<project-prefix>-<issue-number>-<short-desc>
```

##### Types

- task
- fix

##### Examples

- `task/thjs-5-add-clinician-dashboard`
- `task/thjs-12-add-clinician-flow`
- `fix/thjs-16-fix-clinician-flow`

#### 🗂 Commit flow

```
<project-prefix>-<issue-number>: <modifier> <description>
```

##### Modifiers

- `+` (add)
- `*` (edit)
- `-` (remove)

##### Examples

- `thjs-5: + title for dashboard`
- `thjs-12: * dashboard title`
- `thjs-16: - dashboard title`

## PS

The entire list of tasks can also be found on the board [**Trello**](https://trello.com/b/9Y9ZIr6j '**Trello**') in the column **To Do**. You need to copy the board for yourself and work on it. This will help you track the entire process of your work, and we will determine what is already ready. The task will be considered completed if it is fully completed and the feature works. Let's look at its implementation and evaluate whether the logic was distributed correctly in the project. This will show how much you understand the architecture. We will also comment on the code..

The main result of the work can be determined by how deeply you were able to understand the project and understand it, and how far you have advanced in personal learning.

Links:

1. [Repo](https://github.com/BinaryStudioAcademy/thread-js).
2. [Trello](https://trello.com/b/9Y9ZIr6j).

## FAQ:

1. What frameworks, libraries and their features can be used?

Complete freedom of action, feel free, use whatever you want.

2. Is it possible to change the database (add columns, tables)?

It is possible, and in some tasks it is even necessary. To do this, you need to create new migrations. Existing migrations cannot be changed!!! Please do not forget it.

3. When registering an application on the Gyazo website, you must provide `Authorization callback URL`

Use https://www.google.com/.
