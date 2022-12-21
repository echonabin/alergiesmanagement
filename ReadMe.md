# Guide on how to start a project

> Note this project is setup using monorepo architecture (NX) workflow

This repo contains both backend and UI portion of a project itself so, this readMe will guide user on how to get started.

## Backend portion

Backend project is created using Node.Js framework called [Express.Js](https://expressjs.com). And for the project folder architecture it follows MVC pattern. For the database this project use [PostgreSQL](https://www.postgresql.org/) with [Knex](https://knexjs.org/guide/) which is a popular SQL database and for the file storage it use AWS S3 bucket.

> Note as this project depends upon postgres database you need to run the database first inorder to run the project itself

## Using docker to run postgres

If you have docker installed then you can simple use docker-compose to run up database instance

```
docker-compose up
```

this command will spawn up new postgres container and run on port 5432

## How to change database config

In order to config database you can naviagate to > `/apps/alergies-backend/src/db/knexfile.ts` and then edit the database config as per requirements.

## How to create test database

In order to run unit test you need to spawn another database on postgres so, in order to do so you can simply use this command

```bash
docker exec -it `container_name/id` psql -U postgres
```

```sql
CREATE DATABASE allergiestest
```

## How to start a project

> Note that this is dependent upon the database service above so make sure to run it first

Here's a quick way to start Backend

```
git clone <project_url>
```

```
yarn
```

For Development Version

```
yarn start:backend
```

For Built/Production Version

```
yarn build:backend
```

After the build is success, all the built files are stored under the dir name dist

```
cd dist/apps/alergies-backend
```

```
node main.js
```

## UI portion (Frontend)

Frontend project is created using react framework called [Next.Js](https://nextjs.org). For the styling it use [TailwindCss](https://tailwindcss.com).
To understand more about project folder structures please scroll down to folder structure sections.

### How to start a project

Here's a quick way to start UI

```
git clone <project_url>
```

```
yarn
```

For Development Version

```
yarn start:ui
```

For Built/Production Version

```
yarn build:ui
```

After the build is success, all the built files are stored under the dir name dist

```
cd dist/apps/alergies-ui
```

```
npm start
```

## Testing Portion

This project contains both FE and BE testing. BE unit testing is done with [Jest](https://jestjs.io/) and FE e2e testing is done with help of [Cypress](https://www.cypress.io/).

How to run the test

- Backend unit testing

```
yarn test:backend
```

- Frontend e2e test

```
yarn e2e:ui
```

## Project Folder Structure

Here's a folder structure to understand where the file exists.

- apps (where all the main application files exists including backend and ui)

- dist (where all the build files exist)
  \*libs (library folder where all the library responsible for creating a application sits, component libs or utils etc)
- public (where public files like assets and images are set)

```
.
└── ALERGIESMANAGEMENT/
    ├── apps/
    │   ├── alergies-backend
    │   ├── alergies-ui/
    │   │   └── NextJS(files)
    │   └── alergies-ui-e2e
    ├── dist/
    │   ├── alergies-backend
    │   └── alergies-ui
    ├── libs/
    │   ├── components (essential components like button, alert)
    │   ├── constants (constant files like api-routes)
    │   ├── store (root state/ main state store)
    │   └── utils (utility functions)
    ├── tailwind.config.js
    ├── nx.json
    ├── package.json
    └── tsconfig.base.json
```

> Note: Please use yarn as it's perferred version for development for this repo.
