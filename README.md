# BSA 2019 JS - mini-project Thread

## Description
**Thread** - это [SPA](https://medium.com/NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58 "SPA") с готовой архитектурой и структурой, подключенным базовым стеком технологий и стартовым функционалом, предназначенный для самостоятельной практики студентов.

Тематика проекта - социальная сеть, похожая на Twitter.

Основная идея проекта -  ознакомить студентов с нашим виденьем того, как реальный проект должен выглядеть изнутри, и дать возможность самостоятельно исследовать, как устроена архитектура и структура проекта, посмотреть его возможные конфигурации, попробовать покопаться и разобраться в чужом коде.


## Technologies

Здесь перечислены основные фреймворки и библиотеки, используемые в проекте. Полный список используемых технологий для каждой части проекта находится в файлах package.json в папках client и server.

#### Common
1. ES2018
2. [Git](https://git-scm.com/book/ru/v1/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D1%8B-Git "Git")
3. [REST API](https://www.restapitutorial.com/lessons/restquicktips.html "REST API")
4. [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token "JWT")
5. [Socket.IO](https://socket.io/docs/ "Socket.IO")
6. [npm](https://en.wikipedia.org/wiki/Npm_(software))
7. [ESLint](https://eslint.org/docs/user-guide/getting-started "ESLint")

#### Frond-end
1. [React](https://reactjs.org/docs/getting-started.html "React")
2. [React Redux](https://redux.js.org/introduction/getting-started "React Redux")
3. [React Semantic UI](https://react.semantic-ui.com/ "React Semantic UI")
4. [Moment.js](https://momentjs.com/ "Moment.js")
5. [validator.js](https://www.npmjs.com/package/validator "validator.js")
6. [history](https://www.npmjs.com/package/history "history")

#### Back-end
1. [Node.js](https://nodejs.org/en/ "Node.js")
2. [Express](https://expressjs.com/ru/guide/routing.html "Express")
3. [Passport.js](http://www.passportjs.org/docs/ "Passport.js")
4. [Sequelize](http://docs.sequelizejs.com/ "Sequelize")
5. [axios](https://www.npmjs.com/package/axios "axios")
6. [bcrypt](https://www.npmjs.com/package/bcrypt "bcrypt")
7. [Babel](https://babeljs.io/docs/en/index.html "Babel")
8. [nodemon](https://www.npmjs.com/package/nodemon "nodemon")
9. [dotenv](https://www.npmjs.com/package/dotenv "dotenv")
10. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken "jsonwebtoken")

#### Database
1. [PostgreSQL](https://www.postgresql.org/download/ "PostgreSQL")

## Tasks

Необходимо добавить следующие возможности:

1. поставить dislike посту.
2. обновить свой пост.
3. удалить свой пост. Soft deletion - пост должен остаться в базе данных.
4. обновить свой комментарий.
5. удалить свой комментарий. Soft deletion - комментарий должен остаться в базе данных.
6. поставить like комментарию.
7. поставить dislike комментарию.
8. фильтр - не отображать свои посты, а отображать только чужие.
9. фильтр - отображать только те посты, которым я (как пользователь) поставил лайк.
10. отобразить кто поставил like/dislike посту.
11. отобразить кто поставил like/dislike комментарию.
12. обновить собственный профиль. Добавить валидацию.
13. устанавливать статус пользователя (например, "А сегодня, в завтрашний день, не все могут смотреть. Вернее.."). Отображать его под username.
14. сбросить пароль (Forgot password). Отправить email с ссылкой на страницу изменения пароля.
15. отправить пользователю email, если его посту поставили like.
16. поделиться постом по email.

**Note:** Весь список тасков также можно найти на доске [**Trello**](https://trello.com/b/9Y9ZIr6j "**Trello**") в колонке Backlog Students. Её можно скопировать себе и по ней работать. Это поможет отслеживать весь процесс работы.

## Installation
