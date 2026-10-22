// GET /oauth/auth
// Starts the GitHub login for Decap CMS (client/public/admin).
// Needs GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET set in the Cloudflare Pages project.
export async function onRequestGet({ request, env }) {
    const url = new URL(request.url);
    const state = crypto.randomUUID();

    const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
    authorizeUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
    authorizeUrl.searchParams.set("redirect_uri", `${url.origin}/oauth/callback`);
    authorizeUrl.searchParams.set("scope", url.searchParams.get("scope") || "repo");
    authorizeUrl.searchParams.set("state", state);

    return new Response(null, {
        status: 302,
        headers: {
            Location: authorizeUrl.toString(),
            "Set-Cookie": `oauth_state=${state}; Path=/oauth; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
        },
    });
}
