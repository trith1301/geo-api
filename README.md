# GEO API

***ExpressJS (TypeScript) | Prisma | PostgreSQL***

This is a simple ExpressJS project working with TypeScript setup.

## Installation

After cloning this repository, run the command below to install the packages

```bash
npm install
```

The next step is to create a database named `geo_api` in the local PostgreSQL server. Configure the default connection in the [.env](.env); if running PostgreSQL with a different configuration, it can be modified in this file.

Synchronize the Prisma configuration with PostgreSQL by running the command below

```bash
npx prisma migrate dev --name init
```

## Usage

To run in the development environment

```bash
npm run dev
```

To build the application into a static files

```bash
npm run build
```

Have any questions? Contact at [trith13102@gmail.com](mailto:trith13102@gmail.com)
