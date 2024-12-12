import type { PageMetadata } from "$lib"
import type { AppBskyFeedGetAuthorFeed, AppBskyFeedPost } from "@atproto/api"

type FeedItem = {
  _source: 'Pages' | 'Bsky'
  _handle: string
  title: string
  description?: string
  createdAt: string
  uri: string
}

const getPages = async () => {
  const modules = import.meta.glob<
    boolean,
    string,
    {
      default: PageMetadata
    }
  >('$lib/pages/*/index.ts')

  const feed: FeedItem[] = []

  for (const path in modules) {
    const module = await modules[path]()

    const uri = path.slice(path.indexOf('pages/') + 6, path.indexOf('/index'))

    feed.push({
      _source: 'Pages',
      _handle: 'kylepulman',
      ...module.default,
      uri
    })
  }

  return feed
}

const fetchBsky = async (skFetch: typeof fetch) => {
  const response = await skFetch('/api/bluesky')
  const body = await response.json() as AppBskyFeedGetAuthorFeed.Response

  const feed: FeedItem[] = []

  if (response.status === 200) {

    body.data.feed.forEach((item) => {
      const record = item.post.record as AppBskyFeedPost.Record

      feed.push({
        _source: 'Bsky',
        _handle: item.post.author.handle,
        title: record.text,
        createdAt: record.createdAt,
        uri: item.post.uri
      })
    })
  } else {
    console.error(response.status, await response.text())
  }

  return feed
}

export const load = async ({ fetch }) => {
  const pagesFeed = await getPages()
  const bskyFeed = await fetchBsky(fetch)

  const feed: FeedItem[] = [...pagesFeed, ...bskyFeed]

  feed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return {
    feed
  }
}