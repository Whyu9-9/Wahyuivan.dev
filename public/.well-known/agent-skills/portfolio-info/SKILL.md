# portfolio-info

Read Wahyu Ivan's portfolio content as an AI agent, without parsing HTML.

## Endpoints

- `GET /index.md` — markdown summary of the portfolio (also returned for `/` when `Accept: text/markdown`)
- `GET /llms.txt` — llms.txt index of docs and links
- `GET /auth.md` — no authentication required; all endpoints are public

## WebMCP

If `navigator.modelContext` is available in-browser, call `get_portfolio_info`, `get_projects`, or `get_contact`.

## Output

Plain markdown or JSON. No credentials required.
