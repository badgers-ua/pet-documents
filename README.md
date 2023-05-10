<p align="center">
  <a href="https://github.com/badgers-ua/" target="blank"><img src="https://avatars.githubusercontent.com/u/106803527?s=200&v=4" width="120" alt="Badgers UA Logo" /></a>
</p>

  <p align="center">Web app to store and manage you pet's documents. </br>
  <!-- Hosted on: <a href="https://p-doc.com" target="_blank">https://p-doc.com</a><p align="center"> -->

# Structure

| Codebase              |  Description   |
| :-------------------- | :------------: |
| [jill](apps/jill)     | React Frontend |
| [trixie](apps/trixie) |  Nest.js API   |
| [types](libs/types)   | Shared typings |

## Pre Requirements

Create a [Firebase](https://firebase.google.com) project with enabled **Google Authentication** and **Storage Bucket**

- **Google Authentication** is used for
- **Storage Bucket** is used for storing pets avatars

---

### [trixie:](apps/trixie)

1. Add `environment.ts` file to the root of [trixie/src/environments](apps/trixie/src/environments) with following structure:

```
export const environment = {
  production: false,
  databaseUrl: YOU_MONGO_DB_URL,
  port: 5001,
  fbBucketUrl: YOUR_FIREBASSE_STORAGE_BUCKET_URL,
  fbServiceAccount: 'YOUR_FIREBASSE_SERVICE_ACCOUNT'

};
```

---

### [jill:](apps/jill)

1. Add `environment.ts` file to the root of [jill/src/environments](apps/jill/src/environments) with following structure:

```
import appVersion from '../app-version';

export const environment = {
  production: false,
  appVersion: appVersion,
  apiUrl: 'http://localhost:5001',
  firebaseConfig: 'YOUR_FIREBASE_CONFIG',
};

```

## Run Locally

```bash
yarn start:all
```

After running `yarn run start`, api docs are available under http://localhost:5001/graphql

## Steps to add _app_ or _lib_ to monorepo

Project is using [nx.dev](https://nx.dev/) workspaces, ways of adding new apps, libs to nx workspace described at [nx documentation](https://nx.dev/getting-started/intro)
