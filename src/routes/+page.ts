import type { AppBskyFeedGetAuthorFeed, AppBskyFeedPost } from "@atproto/api"

type FeedItem = {
  _source: 'Bsky'
  _handle: string
  title: string
  createdAt: string
  uri: string
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
  const bskyFeed = await fetchBsky(fetch)

  const feed: FeedItem[] = bskyFeed

  return {
    feed
  }
}