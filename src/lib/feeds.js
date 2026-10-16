// Loaders for the GitHub and Medium sections.
// GitHub goes through the cached /api/github Pages Function in production; Medium is fetched from the browser
// because rss2json rejects requests coming from Cloudflare's servers.

const GITHUB_USER = "Whyu9-9";
const MEDIUM_USER = "wahyuivan";
const PINNED_REPOS = ["MyGram-API", "Open-Music-API", "ElysiaBlogAPI", "ChromeBuiltInAISimpleDemo"];

const getJson = async (url, init) => {
    const response = await fetch(url, init);
    if (!response.ok) throw new Error(`${url} responded ${response.status}`);
    return response.json();
};

export const fetchGithub = async ({ token } = {}) => {
    const [repos, contributions] = await Promise.all([
        getJson(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`, {
            headers: {
                // GitHub rejects requests without a User-Agent, which server-side fetch doesn't send
                "User-Agent": "wahyuivan.dev",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        }),
        // The calendar is decoration; don't fail the whole section over it
        getJson(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`)
            .then((data) => data.contributions)
            .catch(() => []),
    ]);

    return {
        repos: repos
            .filter((repo) => PINNED_REPOS.includes(repo.name))
            .map(({ name, html_url, description, stargazers_count, forks_count, archived }) => ({
                name, html_url, description, stargazers_count, forks_count, archived,
            })),
        contributions: contributions.map(({ date, count }) => ({ date, count })),
    };
};

export const fetchPosts = async () => {
    const data = await getJson(
        `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USER}`
    );
    return data.items.slice(0, 5).map(({ title, link, pubDate }) => ({ title, link, pubDate }));
};

// Production reads through the cached Pages Function; dev hits the source directly (functions don't run in Vite).
export const loadFeed = async (feed, loader) => {
    if (import.meta.env?.DEV) return loader();
    try {
        const response = await fetch(`/api/${feed}`);
        if (!response.ok) throw new Error(`/api/${feed} responded ${response.status}`);
        return await response.json();
    } catch (error) {
        // Cloudflare's shared IPs often hit GitHub's anonymous rate limit; the visitor's own IP has a separate quota
        console.warn(`/api/${feed} failed, fetching directly:`, error);
        return loader();
    }
};
