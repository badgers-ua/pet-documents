#!/bin/bash
echo Killing pm2 process
pm2 stop trixie
pm2 kill
echo Generating pm2 config
cd ./apps/trixie
touch pm2.config.js

cat > environment.prod.ts <<EOF
module.exports = {
  apps: [
    {
      name: 'trixie',
      script: 'main.js',
      watch: true,
      env_development: {
        PORT: ${1},
        NODE_ENV: 'development',
      },
      env_production: {
        PORT: ${1},
        NODE_ENV: 'production',
      },
    },
  ],
};
EOF

echo Starting trixie
yarn trixie-start-prod
echo trixie deployed successfully
