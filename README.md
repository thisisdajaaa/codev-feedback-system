# Codev Feedback System

## Table of Contents

- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Commit Changes](#commit-changes)
- [Project Structure](#project-structure)
- [Storybook](#project-structure)
- [Sample Environment File](#sample-environment-file)
- [Code Scaffolding](#code-scaffolding)
- [Naming Convention](#naming-convention)
- [Testing](#testing)

## Technologies

- [NodeJS](https://nodejs.org/)
- [Next.js (React)](https://nextjs.org/)
- [Next Auth](https://next-auth.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Storybook](https://storybook.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

## Prerequisites

### Docker

Docker is a tool designed to make it easier to create, deploy, and run applications by using containers. Containers allow developers to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one package.

To install Docker, you can follow the instructions on the Docker's official website:

- For Windows and MacOS: [Install Docker Desktop](https://www.docker.com/products/docker-desktop)
- For Ubuntu: [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

### Node.js and NVM

This project requires Node.js to run. It's recommended to install Node.js using NVM (Node Version Manager) which allows you to easily install, update and switch between different Node.js versions.

To install NVM, follow the instructions on the [NVM GitHub page](https://github.com/nvm-sh/nvm#installing-and-updating).

Once NVM is installed, you can install Node.js. This project uses Node.js version 16.15.0. To install this version and use it, run the following commands:

```bash
nvm install 16.15.0
nvm use 16.15.0
```

### MongoDB Compass

MongoDB Compass is a GUI for MongoDB. It allows you to visually explore your data, run ad hoc queries, interact with your data with full CRUD functionality, view and optimize your query performance, and more.

To install MongoDB Compass, follow the instructions on the MongoDB Compass documentation.

### Environment Setup

This project uses environment variables for configuration. These variables are loaded from a .env file in the project root.

You can create a .env file by copying the provided .env.example file:

```bash
cp .env.example .env
```

Next, open the .env file and set the values for your environment:

```bash
NEXT_PUBLIC_SHOW_LOGGER=false
NEXT_AUTH_SECRET=codev-feedback-system
NEXT_PUBLIC_BASE_URL=http://localhost:3000

MONGODB_DOCKER_URI=mongodb://root:root@mongo:27017/codev-feedback-system?authSource=admin&retryWrites=true&w=majority
MONGODB_URI=mongodb://root:root@localhost:27017/codev-feedback-system?authSource=admin&retryWrites=true&w=majority

MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=root

GOOGLE_CLIENT_ID=589144237254-5qu9tndfb4m194ks1tov8mq5d3es4q9r.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

SMPT_HOST=smpt.gmail.com
SMTP_SERVICE=gmail
SMTP_PORT=465
SMTP_USER=your_email
SMTP_PASSWORD=your_gmail_app_password
SMTP_ADMIN_EMAIL=your_email
SMTP_FROM=Codev Feedback System
SMTP_FROM_EMAIL=your_email
```

### Running the Project with Docker

This project is configured to run in a Docker container. To start the application, use Docker Compose:

```bash
docker-compose up
```

This will start the application and MongoDB in separate containers. The application will be available at http://localhost:3000, and MongoDB at mongodb://root:root@mongo:27017, just copy this url in mongodb compass to connect to the mongodb server.

Remember to stop the containers when you're done:

```bash
docker-compose down
```

The containers' data will be persisted in Docker volumes. To remove the data, you can remove the volumes:

```bash
docker volume rm codev-feedback-system_mongodbdata
```

## Commit Changes

```bash
# Identify changes you want to commit
git add .

# Husky will trigger, select appropriate choices for commit message and after finalizing commit message, upon arriving to vim just type :wq and enter to save
git commit

# Push changes to remote branch if changes has been finalized
git push origin branch-name
```

## Project Structure

| Name                  | Description                                         |
| --------------------- | --------------------------------------------------- |
| **src/components**/\* | All app wise common components                      |
| **src/config**/\*     | Any app level environment configs should go here.   |
| **src/constants**/\*  | Common constant values                              |
| **src/generators**/\* | Plop generator templates                            |
| **src/hooks**/\*      | Custom react hooks                                  |
| **src/redux**/\*      | Redux store that stores all global state of the app |
| **src/pages**/\*      | App pages                                           |
| **src/styles**/\*     | Common/Global styles                                |
| **src/utils**/\*      | Utility functions                                   |
| .comminlintrc.json    | Commit lint configuration                           |
| .editorconfig         | Editor configuration                                |
| .eslintrc.js          | Eslint configuration                                |
| .env.example          | Project environment variables                       |
| .eslintignore         | Folder and files ignored by eslint                  |
| .gitignore            | Folder and files ignored by git.                    |
| .prettierignore       | Folder and files ignored by prettier.               |
| .prettierrc           | Prettier configuration                              |
| .jest.config.js       | Jest configuration                                  |
| .jest.setup.js        | Jest setup                                          |
| app.json              | App configurations by expo                          |
| App.tsx               | Entry point for the applicatinon                    |
| next.config.js        | Next.js configuration                               |
| plopfile.js           | Plop implementation                                 |
| postcss.config.js     | PostCSS config                                      |
| tailwind.config.js    | Tailwind config                                     |
| package.json          | NPM dependencies.                                   |
| tsconfig.json         | Contains typescript configuration for this project. |

## Storybook

```bash
# Opens storybook
yarn storybook
```

## Sample Environment File

This project contains a `.env.example` file that you can use. Rename it to `.env` and modify the contents to your needs.

## Code Scaffolding

### Story Creation

Run `yarn plop` to generate a new component and select a location on where to store the generated story.

### Components ( if needed )

Check the `components` folder if you have neccessary components needed to finish your screen. If not, you can define the component in the screen itself or add any components here if you think it is reusable between screens.

1. Create a folder for the component in `src/components`. The name should be able to give others the idea what the component is about.
2. Create a TSX file called `index.tsx` under that folder. This file will define the component itself.
3. (Optional) You can also create a component within a component for complex components.

### Pages

The screen defines a collection of components. You can define some components here if you think it is only usable within the screen but preferrably components should be resuable. Any logic, API request, or retrieving from redux store should be defined here.

1. Create a folder under `src/pages`. Make sure the name is concise enough to understand what the component is about.
2. Create a TSX called `index.tsx`. This file will define the page itself.

## Naming Convention

### For variables, files and folders

Use `camelCase` for files and folders that are not components or pages and `camelCase` for variables within files. The only exception would be the component and pages names which should be `PascalCase`.

```
// File name is Button.tsx

const Button: React.FC = () => {
  const propName = 'Sample'
  return <EditProfile name={propName} />;
};
```

In some cases, we include the file `functionality` in its file name in the format:

`<file-name>-<functionality>.<extension>`
`<file-name><functionality>.<extension>`

Non-component/screen file/folder naming example:

- auth.ts
- users.ts
- rootReducer.ts

Pages/component file/folder naming example:

- Button
- Sidebar
- Login

## Testing

- When testing all of the components, use `yarn test .`
- When testing a specific component, use `yarn test componentName`
