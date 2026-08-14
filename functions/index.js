export async function onRequest(context) {
  const accept = context.request.headers.get('accept') || ''
  if (!accept.includes('text/markdown')) {
    return context.next()
  }

  const markdownUrl = new URL('/index.md', context.request.url)
  const response = await context.env.ASSETS.fetch(new Request(markdownUrl, context.request))

  return new Response(response.body, {
    status: response.status,
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
