import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../siteConfig';
import { getPublishedPosts } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site!,
    // The feed's main language; individual posts may be in Traditional Chinese.
    customData: '<language>en</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blogs/${post.data.slug}/`,
      categories: post.data.tags,
    })),
  });
}
