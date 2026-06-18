function requireFacebookEnv() {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    throw new Error('FACEBOOK_PAGE_ID and FACEBOOK_PAGE_ACCESS_TOKEN are required.');
  }

  return { pageId, accessToken };
}

export async function fetchFacebookPosts() {
  const { pageId, accessToken } = requireFacebookEnv();
  const url = new URL(`https://graph.facebook.com/${pageId}/posts`);

  url.searchParams.set('fields', 'id,message,created_time,permalink_url,full_picture');
  url.searchParams.set('limit', process.env.FACEBOOK_POST_LIMIT || '10');
  url.searchParams.set('access_token', accessToken);

  const response = await fetch(url, { cache: 'no-store' });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload?.error?.message || `Facebook API request failed with status ${response.status}`;
    throw new Error(message);
  }

  return (payload.data || [])
    .filter((post) => post.message && post.message.trim())
    .map((post) => ({
      platform: 'facebook',
      socialPostId: post.id,
      caption: post.message,
      mediaType: 'post',
      imageUrl: post.full_picture || '',
      thumbnailUrl: post.full_picture || '',
      videoUrl: '',
      sourceUrl: post.permalink_url || '',
      publishedAt: post.created_time,
    }));
}
