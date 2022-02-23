# Vending machine API

Project developed for the MVPmatch process

## Quick Start

Clone project to create your project, simply run:

```bash
git clone https://github.com/gagocarrilloedgar/vending-api <project-name>
```

Set the environment variables:
(You can see all enviroment key at **.env.example**)

## Features & stack

- **NoSQL database**: [MongoDB](https://www.mongodb.com/) object data modeling using [Mongoose](https://mongoosejs.com/) and hosted on [MongoDB Atlas](https://cloud.mongodb.com/)
- **Authentication and authorization**: using [passport](http://www.passportjs.org/) and a custom role funciton
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io/), [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server) and [SuperTest](https://www.npmjs.com/package/supertest)
- **Error handling**: centralized error handling mechanism
- **Dependency management**: with [npm](https://www.npmjs.com)
- **Environment variables**: using [dotenv-safe](https://www.npmjs.com/package/dotenv-safe)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io/)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
- **Git hooks**: with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- **Linting**: with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) (fixing)
- **Docs**: with [APIDoc](https://apidocjs.com)
- **TS**: [Typescrpit](https://www.typescriptlang.org)
- **Containerization**: with [Docker](https://www.docker.com) to easily deploy to AWS
- **Deployment**: with [AWS Elastic Beanstalk](https://aws.amazon.com/es/elasticbeanstalk) and [AWS CodePipeline](https://docs.aws.amazon.com/code/index.html)

## Commands

Running locally:

```bash
npm run dev
```

building:

```bash
npm run build
```

Running production (build before use):

```bash
npm start
```

Testing:

```bash
# run all unit tests
npm test

# run all unit tests in watch mode
npm test:watch

```

## With docker

Using the Dockerfile 

```sh
  # Docker start | Start docker
  docker build -t [image_name] .
  docker run -it -p [PORT]:3000 [image_name]
```

## Documenation

run from root:

```bash
# if not installed
npm install apidoc -g

# create/update the documentation folder
apidoc -i src/ -o public/
```

or

```bash
# npm script
npm run docs
```

After that if you want to see the documentation simply run:

```shell
npm run dev
```

and go to http://localhost:3000

## Project Structure

```bash
src\
 |--api\
 |--config\         # Environment variables and configuration related things
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--utils\          # Utility classes and functions
 |--app.js          # Express app
 |--index.js        # App entry point
tests\
 |--fixtures\
 |--integration\
 |--utils\
 |--...src\
```

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).

In this app, ESLint is configured to follow the [Standar JavaScript style guide](https://standardjs.com) with some modifications.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

## Contributing

Contributions are welcome! Please check out the [contributing guide](https://github.com/gagocarrilloedgar/vending-api/blob/main/CONTRIBUTING.md).

## License

[MIT](https://github.com/gagocarrilloedgar/vending-api/blob/master/LICENSE)

## Contact info

You can contact me using:

[Edgar Gago Carrillo](https://www.linkedin.com/in/gagocarrilloedgar/)

or:

> hello@nuwe.io
