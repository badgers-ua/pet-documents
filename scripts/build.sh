#!/bin/bash
echo Installing dependencies
yarn install --frozen-lockfile

echo Fetching environment variables

touch ./apps/jill/src/environments/environment.ts
cat > ./apps/jill/src/environments/environment.ts <<EOF
export const environment: any = {
  production: false,
};
EOF

touch ./apps/jill/src/environments/environment.prod.ts
cat > ./apps/jill/src/environments/environment.prod.ts <<EOF
import appVersion from '../app-version';

export const environment: any = {
  production: ${1},
  appVersion,
  apiUrl: ${2},
  firebaseConfig: ${3},
};
EOF

touch ./apps/trixie/src/environments/environment.ts
cat > ./apps/trixie/src/environments/environment.ts <<EOF
export const environment: any = {
  production: false,
};
EOF

touch ./apps/trixie/src/environments/environment.prod.ts
cat > ./apps/trixie/src/environments/environment.prod.ts <<EOF
export const environment: any = {
  production: ${1},
  databaseUrl: ${4},
  port: ${5},
  fbBucketUrl: ${6},
  fbServiceAccount: ${7},
};
EOF

echo Building apps
yarn build:all:prod
