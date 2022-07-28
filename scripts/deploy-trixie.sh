#!/bin/bash
echo Killing pm2 process
pm2 stop trixie
pm2 kill
echo Generating pm2 config
touch ./dist/apps/trixie/pm2.config.js

cat > ./dist/apps/trixie/pm2.config.js <<EOF
module.exports = {
  apps: [
    {
      name: 'trixie',
      script: './dist/apps/trixie/main.js',
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
