# Trombone Collection

This is a collegiate data collection of historic trombones made before 1800.

The site is a static React app (built with [Vite](https://vite.dev)) hosted on Cloudflare Workers. There is no database or server:

- Each trombone is a JSON file in `content/trombones/`. The filename is the trombone's id (it appears in `/details/<id>` URLs).
- Images are regular files in `client/public/uploads/`.
- At build time, `scripts/build-data.js` combines every record into `client/public/data/trombones.json`, which the app loads.
- The admin page (`/admin/`) runs [Decap CMS](https://decapcms.org). Editors log in with GitHub. Saving an entry commits the change to the `master` branch, and Cloudflare then rebuilds the site (takes about a minute or two).
- `worker/` is a small Cloudflare Worker that runs the GitHub login for the CMS. Everything else is served as static files. `wrangler.jsonc` configures both.

Anyone with write access to this GitHub repo can edit through the CMS. To add an editor, add them as a collaborator on the repo.

## Local Development
---
### Setting up environment
You need Node.js 22.22 or newer (`.nvmrc` has the version Cloudflare uses).
```
git clone git@github.com:maximusunc/tromboneCollection.git
cd tromboneCollection
npm install
```

### Run Locally
```
npm start
```
This serves the site at http://localhost:3000. Restart it to pick up changes to `content/`.

### Editing content locally
In a second terminal, run
```
npm run cms
```
then open http://localhost:3000/admin/index.html and click "Login". Changes are written straight to the files in `content/` and `client/public/uploads/`, without touching GitHub. Commit them as usual.

You can also edit the JSON files in `content/trombones/` by hand.

### Running the production setup locally
```
npm run preview
```
This builds the site and serves it with Wrangler at http://localhost:8787, the same way Cloudflare does. To try the GitHub login locally, put `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in a `.dev.vars` file (it is gitignored).

## Deployment
Cloudflare builds and deploys automatically on every push. Pushes to `master` go to production. Other branches (e.g. `devel`) get their own preview URL.

### One-time setup
1. **Export the data out of MongoDB.** With the Atlas connection string:
   ```
   MONGO_URL="mongodb+srv://trombone_admin:<password>@trombonecollection.fsizb.mongodb.net/<database name>?retryWrites=true&w=majority" npm run export-mongo
   ```
   This writes one file per trombone into `content/trombones/` and turns the embedded base64 images into files in `client/public/uploads/`. Check the result with `npm start`, then commit and push.
2. **Create the Worker.** In the Cloudflare dashboard, go to Workers & Pages → Create → Import a repository, and pick this repo. Settings:
   - Project name: `trombonecollection` (must match `name` in `wrangler.jsonc`)
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
   - Non-production branch deploy command: `npx wrangler versions upload`
   - Path: leave as `/`

   Under the build settings, set the production branch to `master`. The Node version comes from `.nvmrc`.
3. **Create a GitHub OAuth App** for the CMS login, at GitHub → Settings → Developer settings → OAuth Apps → New OAuth App:
   - Homepage URL: `https://<your domain>`
   - Authorization callback URL: `https://<your domain>/oauth/callback`
4. **Add the OAuth App's credentials** to the Worker, under Settings → Variables and Secrets: `GITHUB_CLIENT_ID`, and `GITHUB_CLIENT_SECRET` as a secret. They take effect on the next deploy.
5. **Point the domain at the Worker** (Settings → Domains & Routes → Add → Custom domain), and once everything works, shut down the Lightsail instance and the Atlas cluster.

To change the fields in the CMS, edit `client/public/admin/config.yml`.
