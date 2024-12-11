import { BSKY_IDENTIFIER, BSKY_PASSWORD, BSKY_SERVICE } from '$env/static/private'
import { AtpAgent } from '@atproto/api'

const agent = new AtpAgent({
  service: BSKY_SERVICE,
})

await agent.login({
  identifier: BSKY_IDENTIFIER,
  password: BSKY_PASSWORD
})

export const createPost = (text: string) => agent.post({
  text,
  createdAt: new Date().toISOString()
})