import type { PageMetadata } from '$lib'
import { parse } from 'marked'

export const load = async (event): Promise<{
  metadata: PageMetadata
  html: string
}> => {
  const slug = event.params.slug

  const modules = await Promise.all([
    import(`$lib/pages/${slug}/index.ts`),
    import(`$lib/pages/${slug}/index.md?raw`)
  ])

  const html = await parse(modules[1].default)

  return {
    metadata: modules[0].default,
    html
  }
}