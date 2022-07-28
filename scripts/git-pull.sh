#!/bin/bash
echo "Pulling changes"
git fetch --all
git reset --hard origin/main
git pull