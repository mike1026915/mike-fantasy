import { getCollection } from 'astro:content';

/** Published (non-draft) posts, newest first. */
export async function getPublishedPosts() {
  return (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}
