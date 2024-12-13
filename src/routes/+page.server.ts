import type { PageMetadata } from "$lib"
import { getMyPosts } from "$lib/bluesky"
import type { AppBskyFeedPost } from "@atproto/api"

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

const fetchBsky = async () => {
  const body = await getMyPosts()

  console.log('Rate limit remaining:', body.headers['ratelimit-remaining'])

  const feed: FeedItem[] = []

  if (body.success === true) {
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
    console.error(body.success, body)
  }

  return feed
}

export const load = async (event) => {
  const pagesFeed = await getPages()

  const feed: FeedItem[] = pagesFeed
  let bskyFeed: FeedItem[] = []

  const bskyFeedCookie = event.cookies.get('bsky')
  if (bskyFeedCookie) {
    bskyFeed = JSON.parse(bskyFeedCookie)
  } else {
    bskyFeed = await fetchBsky()

    event.cookies.set('bsky', JSON.stringify(bskyFeed), {
      path: '/',
      httpOnly: true,
      maxAge: 5 * 60
    })
  }

  bskyFeed.forEach((item) => {
    feed.push(item)
  })

  feed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return {
    feed
  }
}