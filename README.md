# Trombone Collection

This is a collegiate data collection of historic trombones made before 1800.

The site is a static React app hosted on Cloudflare Pages. There is no database or server:

- Each trombone is a JSON file in `content/trombones/`. The filename is the trombone's id (it appears in `/details/<id>` URLs).
- Images are regular files in `client/public/uploads/`.
- At build time, `scripts/build-data.js` combines every record into `client/public/data/trombones.json`, which the app loads.
- The admin page (`/admin/`) runs [Decap CMS](https://decapcms.org). Editors log in with GitHub. Saving an entry commits the change to the `master` branch, and Cloudflare Pages then rebuilds the site (takes about a minute or two).
- `functions/oauth/` holds the Cloudflare Pages Functions that run the GitHub login for the CMS.

Anyone with write access to this GitHub repo can edit through the CMS. To add an editor, add them as a collaborator on the repo.

## Local Development
---
### Setting up environment
```
git clone git@github.com:maximusunc/tromboneCollection.git
cd tromboneCollection
yarn install
```

### Run Locally
```
yarn start
```
This serves the site at http://localhost:3000. Restart it to pick up changes to `content/`.

### Editing content locally
In a second terminal, run
```
yarn cms
```
then open http://localhost:3000/admin/index.html and click "Login". Changes are written straight to the files in `content/` and `client/public/uploads/`, without touching GitHub. Commit them as usual.

You can also edit the JSON files in `content/trombones/` by hand.

## Deployment
Cloudflare Pages builds and deploys automatically on every push. Pushes to `master` go to production. Pushes to other branches (e.g. `Development`) get their own preview URL.

### One-time setup
1. **Export the data out of MongoDB.** With the Atlas connection string:
   ```
   MONGO_URL="mongodb+srv://trombone_admin:<password>@trombonecollection.fsizb.mongodb.net/<database name>?retryWrites=true&w=majority" yarn export-mongo
   ```
   This writes one file per trombone into `content/trombones/` and turns the embedded base64 images into files in `client/public/uploads/`. Check the result with `yarn start`, then commit and push.
2. **Create the Cloudflare Pages project.** In the Cloudflare dashboard, go to Workers & Pages → Create → Pages → Connect to Git, and pick this repo. Settings:
   - Production branch: `master`
   - Build command: `yarn build`
   - Build output directory: `client/build`
   - Root directory: leave blank (`functions/` has to stay at the repo root)

   The Node version comes from `.nvmrc`.
3. **Create a GitHub OAuth App** for the CMS login, at GitHub → Settings → Developer settings → OAuth Apps → New OAuth App:
   - Homepage URL: `https://<your domain>`
   - Authorization callback URL: `https://<your domain>/oauth/callback`
4. **Add the OAuth App's credentials** to the Pages project, under Settings → Variables and Secrets: `GITHUB_CLIENT_ID`, and `GITHUB_CLIENT_SECRET` as a secret. Then redeploy.
5. **Point the domain at Pages** (Custom domains tab), and once everything works, shut down the Lightsail instance and the Atlas cluster.

To change the fields in the CMS, edit `client/public/admin/config.yml`.
