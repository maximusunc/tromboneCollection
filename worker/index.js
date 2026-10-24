// Cloudflare Worker entry point. The site itself is served as static assets
// from client/build (see wrangler.jsonc); only the CMS login routes reach this code.
import { handleAuth } from "./oauth-auth";
import { handleCallback } from "./oauth-callback";

export default {
    async fetch(request, env) {
        const { pathname } = new URL(request.url);
        if (request.method === "GET" && pathname === "/oauth/auth") {
            return handleAuth(request, env);
        }
        if (request.method === "GET" && pathname === "/oauth/callback") {
            return handleCallback(request, env);
        }
        return env.ASSETS.fetch(request);
    },
};
