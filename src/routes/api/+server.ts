import { API_BASIC } from "$env/static/private"
import { createPost } from "$lib/bluesky"
import { error, json } from "@sveltejs/kit"

export const POST = async ({ request }) => {
  const basicAuth = request.headers.get('Authorization')

  if (basicAuth !== `Basic ${API_BASIC}`) {
    throw error(401)
  }

  const body = await request.json()

  const result = await createPost(body.text)

  return json({
    result
  })
}