# Guide on how to start a project

> Note this project is setup using monorepo architecture (NX) workflow

This repo contains both backend and UI portion of a project itself so, this readMe will guide user on how to get started.

## Backend portion

Backend project is created using Node.Js framework called [Express.Js](https://expressjs.com). And for the project folder architecture it follows MVC pattern. For the database this project use [PostgreSQL](https://www.postgresql.org/) with [Knex](https://knexjs.org/guide/) which is a popular SQL database and for the file storage it use AWS S3 bucket with cloudfront.

## How to start a project

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

##Project Folder Structure
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
    │   └── practitioner-e2e
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
