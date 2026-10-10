import { fetchGithub, fetchPosts } from "../../src/lib/feeds.js";

const feeds = {
    github: (env) => fetchGithub({ token: env.GITHUB_TOKEN }),
    posts: () => fetchPosts(),
};

// Serves /api/github and /api/posts, cached at the edge for an hour so visitors never hit the upstream APIs.
export async function onRequestGet({ request, params, env, waitUntil }) {
    const load = feeds[params.feed];
    if (!load) return new Response("Not found", { status: 404 });

    // Key on the path only, so ?random query strings can't bypass the cache and hammer the upstream APIs
    const { origin, pathname } = new URL(request.url);
    const cacheKey = new Request(origin + pathname);
    const cache = caches.default;
    const hit = await cache.match(cacheKey);
    if (hit) return hit;

    try {
        const response = Response.json(await load(env), {
            headers: { "Cache-Control": "public, max-age=600, s-maxage=3600" },
        });
        waitUntil(cache.put(cacheKey, response.clone()));
        return response;
    } catch (error) {
        console.warn(`Feed ${params.feed} failed:`, error);
        return Response.json({ error: "Upstream unavailable" }, { status: 502 });
    }
}
