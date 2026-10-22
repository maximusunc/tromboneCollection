// GET /oauth/callback
// GitHub redirects here after login. Exchanges the code for a token and hands it
// back to the Decap CMS window that opened this popup.
export async function onRequestGet({ request, env }) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const cookieState = (request.headers.get("Cookie") || "").match(/(?:^|;\s*)oauth_state=([^;]+)/);

    if (!code || !state || !cookieState || cookieState[1] !== state) {
        return reply(url.origin, "error", { message: "Login failed: invalid state. Please try again." });
    }

    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent": "trombonecollection-cms",
        },
        body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code,
            redirect_uri: `${url.origin}/oauth/callback`,
        }),
    });
    const result = await tokenResponse.json().catch(() => ({}));

    if (!result.access_token) {
        return reply(url.origin, "error", { message: result.error_description || "Login failed." });
    }
    return reply(url.origin, "success", { token: result.access_token, provider: "github" });
}

// Decap's popup handshake: announce "authorizing:github", then once the CMS
// answers, send the result back to it (only if it is on this same site).
function reply(origin, status, content) {
    const message = `authorization:github:${status}:${JSON.stringify(content)}`;
    const html = `<!doctype html><html><body><script>
(function () {
    var origin = ${JSON.stringify(origin)};
    var message = ${JSON.stringify(message).replace(/</g, "\\u003c")};
    function receive(event) {
        if (event.origin !== origin) return;
        window.removeEventListener("message", receive);
        window.opener.postMessage(message, origin);
    }
    window.addEventListener("message", receive);
    window.opener.postMessage("authorizing:github", origin);
})();
</script></body></html>`;
    return new Response(html, {
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Set-Cookie": "oauth_state=; Path=/oauth; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
        },
    });
}
