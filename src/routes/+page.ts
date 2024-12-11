import type { AppBskyFeedGetAuthorFeed, AppBskyFeedPost } from "@atproto/api"
import type { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs.js"

export const load = async ({ fetch }) => {
  const response = await fetch(`/api`)

  const body = await response.json() as AppBskyFeedGetAuthorFeed.Response

  const feed: {
    text: AppBskyFeedPost.Record['text']
    createdAt: AppBskyFeedPost.Record['createdAt']
    uri: PostView['uri']
  }[] = []

  if (response.status === 200) {

    body.data.feed.forEach((item) => {
      const record = item.post.record as AppBskyFeedPost.Record

      feed.push({
        text: record.text,
        createdAt: record.createdAt,
        uri: item.post.uri
      })
    })
  } else {
    console.error(response.status, await response.text())
  }

  return {
    feed
  }
}