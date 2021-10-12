# 275 Final Project Starter Repo
Hello! This repository has been pre-configured with eslint and gh-pages to automatically deploy your app when you push to the main branch. 

You will, however, need to finish setting up the deployment.

## Setting Up the Deployment

### 1. Generate a personal access token
Click on your picture -> settings in the top right of Github. Then, scroll to "Developer Settings" and click "Personal access tokens." Generate a new token with "repo" access and no expiration date. Make sure you copy the created token as you will not be able to see it after this.

### 2. Add a secret to the forked repo
Go to settings -> secrets and click "New repository secret." Name the secret "GH_TOKEN" and paste in the value you copied in the previous step. 

### 3. Test your deployment

Make a change in `src/App.tsx`. Commit and push the change to the main branch and see if your deployment was successful. 

In the future, you will no longer need to use the `npm run deploy` command - you just need to have a successful push to the `main` branch and it'll automatically deploy!

All your teammates will additionally need to make feature branches to add your names to the site, merging them as Pull Requests to main. Follow the instructions in the Canvas Assignment for more details.
