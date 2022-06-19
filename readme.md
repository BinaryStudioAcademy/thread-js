# ThreadJS

## Description
[**Thread**](git@github.com:BinaryStudioAcademy/thread-js.git) - this is [SPA](https://medium.com/NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58 "SPA") with a ready-made architecture and structure, a connected basic technology stack and start-up functionality, designed for individual practice of students.

The main theme of the project is a social network similar to Twitter.

The main idea of the project is to onboard students with our vision of how a real project should look like from the inside, and give them the opportunity to individually explore how the architecture and structure of the project works, see its possible configurations, try to deeply understand someone else's code.


## Technologies

The main frameworks and libraries used in the project are listed here. A complete list of technologies used for each part of the project is in the ```package.json``` files in the ```client``` and ```server``` folders.

### Common
1. ESLatest
2. [Git](https://git-scm.com/doc)
3. [REST API](https://www.restapitutorial.com/lessons/restquicktips.html)
4. [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token)
5. [Socket.IO](https://socket.io/docs/)
6. [npm](https://en.wikipedia.org/wiki/Npm_(software))
7. [ESLint](https://eslint.org/docs/user-guide/getting-started)
8. [joi](https://www.npmjs.com/package/joi)
9. [dayjs](https://day.js.org/)

### Frontend
1. [React](https://reactjs.org/docs/getting-started.html)
2. [React Redux](https://redux.js.org/introduction/getting-started)
3. [React Hook Form](https://react-hook-form.com/get-started)
4. [history](https://www.npmjs.com/package/history)

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

### Database
1. [PostgreSQL](https://www.postgresql.org/download/ "PostgreSQL")

## Installation

1. Get the latest stable version [Node.js](https://nodejs.org/en/ "Node.js") (LTS). **Note:** npm will be installed automatically. Check the correctness of the installation: to do this, run in the command line (terminal):

    ```
    node -v  // for checking Node.js version
    npm -v // for checking npm version
    ```

2. Get the latest stable version [PostgreSQL](https://www.postgresql.org/download/ "PostgreSQL") for your OS. Check the correctness of the work - try to create a database, a table - for this you can use [pgAdmin](https://www.pgadmin.org/ "pgAdmin") or any other convenient way you find.

3. Create in PostgreSQL **empty** database for the project. For example, *thread*.

4. Install Git.

  **Note**: If you are using Windows, do these two additional steps before cloning the repo:
  * Change ```eol``` setting in your code editor to ```lf```.
  * Change the ```autocrlf``` setting to ```input``` in the Git settings:
    ```
    git config --global core.autocrlf input
    ```

5. Clone project`s [repo](https://github.com/BinaryStudioAcademy/thread-js):

    ```
    git clone git@github.com:BinaryStudioAcademy/thread-js.git
    ```

6. **Create a repo at [Bitbucket](https://bitbucket.org/) and carry out further development there.**

### Root of project

1. In the root of the project, you can install all the dependencies with one command:

    ```
      npm run install:all
    ```

    This will install the dependencies for the root directory, frontend and backend. Can be installed for each folder separately (see below).

2. After installing the packages, in the root of the project, you need to run the command to [git-hooks](https://www.npmjs.com/package/simple-git-hooks):

    ```
      npx simple-git-hooks
    ```

    **Now, for each of your commits, the linter will be launched and check your code.**

### Shared

Shared package contains code that is used for both frontend and backend.

1. In the command line (terminal) go to the ```shared``` folder:

    ```
    cd /* path to shared folder */
    ```

2. Install all required packages from package.json with the command:

    ```
    npm install
    ```

### Backend

1. In the command line (terminal) go to the folder server:

    ```
    cd /* path to server folder */
    ```

2. Install all required packages from ```package.json``` with the command:

    ```
    npm install
    ```

3.  In the server folder create a file **.env** and copy the contents of the file **.env.example** into it.

    **Note**: file **.env** contains real project keys and should not be saved to the repository.

    Replace in file **.env** key values to real.
    In order to specify the keys for Gyazo Storage, you need to register on the site [Gyazo](https://gyazo.com/captures) and [register the app](https://gyazo.com/oauth/applications). Then, in **.env**  use `access token` from the recently created application to Gyazo.

4. Run [migrations](https://knexjs.org/#Migrations) and seeds to populate the database with demo data. To do this, in the command line (terminal) in the server folder, run:

    ```
    npm run migrate:run
    npm run seed:run
    ```

    Check the database for demo data.

5. To start the server in the command line (terminal) in the server folder, run:

    ```
    npm start
    ```

### Frontend

1. In the command line (terminal) go to the ```client``` folder:

    ```
    cd /* path to client folder */
    ```

2. Install all required packages from package.json with the command:

    ```
    npm install
    ```

3.  In the ```client``` folder create a file **.env** and copy the contents of the file into it **.env.example**.

    **Note**: file **.env** contains real project keys and should not be saved to the repository.

    Replace in file **.env** key values to real.

4. To run the client from the command line (terminal) in the client folder, run:

    ```
    npm start
    ```

    The app should automatically open in your default browser.
## PS

The entire list of tasks can also be found on the board [**Trello**](https://trello.com/b/9Y9ZIr6j "**Trello**") in the column **To Do**. You need to copy the board for yourself and work on it. This will help you track the entire process of your work, and we will determine what is already ready. The task will be considered completed if it is fully completed and the feature works. Let's look at its implementation and evaluate whether the logic was distributed correctly in the project. This will show how much you understand the architecture. We will also comment on the code..

The main result of the work can be determined by how deeply you were able to understand the project and understand it, and how far you have advanced in personal learning.

Links:
1. [Repo](https://github.com/BinaryStudioAcademy/thread-js).
2. [Trello](https://trello.com/b/9Y9ZIr6j).

## FAQ:

1. What frameworks, libraries and their features can be used?

Complete freedom of action, feel free, use whatever you want.

2. Is it possible to change the database (add columns, tables)?

It is possible, and in some tasks it is even necessary. To do this, you need to create new migrations. Existing migrations cannot be changed!!! Please do not forget it.

3. When registering an application on the Gyazo website, you must provide ```Authorization callback URL```

Use https://www.google.com/.
