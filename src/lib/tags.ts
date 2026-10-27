/** URL segment for a tag: /blogs/tags/<slug>/. Case-insensitive, spaces become hyphens. */
export function tagSlug(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, '-');
}

export function tagHref(tag: string): string {
  return `/blogs/tags/${encodeURIComponent(tagSlug(tag))}/`;
}

/** Group posts by tag slug; keeps the first spelling seen as the display name. */
export function groupPostsByTag<T extends { data: { tags: string[] } }>(posts: T[]) {
  const groups = new Map<string, { name: string; posts: T[] }>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = tagSlug(tag);
      const group = groups.get(slug) ?? { name: tag.trim(), posts: [] };
      if (!group.posts.includes(post)) group.posts.push(post);
      groups.set(slug, group);
    }
  }
  return groups;
}
