#!/bin/bash

# 1. Start MySQL Server
echo "Starting MySQL..."
sudo service mysql start

# 2. Wait for MySQL to be ready before moving on
while ! sudo service mysql status | grep -q "is running"; do
  sleep 1
done

# 3. Sync Database Schema (Optional but recommended)
echo "Syncing Database..."
npx prisma db push

# 4. Start Flask in the background
echo "Starting Flask Backend..."
nohup python app.py > flask.log 2>&1 &

# 5. Start React in the foreground
# This keeps the terminal 'busy' so the container stays active
echo "Starting React Frontend..."
npm start