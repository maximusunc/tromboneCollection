# Trombone Collection

This is a collegiate data collection of historic trombones made before 1800.

## Local Development
---
### Setting up environment
```
git clone git@github.com:maximusunc/tromboneCollection.git
yarn install
cd client
yarn install
cd ..
```
### Setting up MongoDB
In a terminal, make sure you have mongo installed, then run commands
```
mongod --db-path ./db
```
That will start a mongo server
*If you want to modify the db in the terminal, run the following commands*
- In another terminal:
```
mongo
use tromboneCollection
```
That will create or open the tromboneCollection database that the front-end is using

### Run Locally
```
yarn start
```

## Deployment
- Run:
```
yarn build
```
- Push to Development branch first. That should create an automatic heroku build at trombonecatalog.herokuapp.com
- Make sure everything works correctly there
- Merge into Master branch. That will create an automatic heroku build at trombonecollection.herokuapp.com
