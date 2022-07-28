#!/bin/bash
echo Installing dependencies
yarn install --frozen-lockfile

echo Fetching environment variables
cd ./apps/jill/src/environments

touch environment.prod.ts
cat > environment.prod.ts <<EOF
import appVersion from '../app-version';

export const environment = {
  production: ${1},
  appVersion: '1.4.0',
  apiUrl: ${2},
  firebaseConfig: ${3},
};
EOF
cd ../../trixie/src/environments

touch environment.prod.ts
cat > environment.prod.ts <<EOF
export const environment = {
  production: ${1},
  databaseUrl: ${4},
  port: ${5},
  fbBucketUrl: ${6},
  fbServiceAccount: ${7},
};
EOF
cd ../../

echo Building apps
yarn build:all:prod
