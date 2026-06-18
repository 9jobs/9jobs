const {
  cleanCaption,
  createSlug,
  createTitleFromCaption,
  normalizeSocialPostToBlog,
} = require('../frontend/lib/blog/normalizeSocialPost');

describe('social post blog normalization', () => {
  test('creates readable titles from the first caption line', () => {
    const title = createTitleFromCaption(
      'We helped a candidate land interviews with a sharper resume and LinkedIn profile across Melbourne roles this week\nMore details here.'
    );

    expect(title.startsWith('We helped a candidate land interviews')).toBe(true);
    expect(title.endsWith('...')).toBe(true);
    expect(title.length).toBeLessThanOrEqual(80);
  });

  test('creates lowercase URL-safe slugs', () => {
    expect(createSlug('Hello, Australia Jobs! 2026')).toBe('hello-australia-jobs-2026');
    expect(createSlug('  LinkedIn & SEEK Profile Tips  ')).toBe('linkedin-and-seek-profile-tips');
  });

  test('cleans excessive hashtag runs without removing useful copy', () => {
    const cleaned = cleanCaption('Career update for Australia job seekers #jobs #career #resume #interviews #australia');

    expect(cleaned).toContain('Career update for Australia job seekers');
    expect(cleaned.match(/#/g)).toHaveLength(3);
  });

  test('normalizes a social post into a published blog document', () => {
    const caption = 'We helped a candidate land interviews\nSmall resume changes can make a big difference. #jobs #career #resume #interviews';
    const normalized = normalizeSocialPostToBlog({
      platform: 'facebook',
      socialPostId: '123_456',
      caption,
      imageUrl: 'https://example.com/post.jpg',
      sourceUrl: 'https://facebook.com/example/posts/123',
      publishedAt: '2026-06-15T02:00:00.000Z',
    });

    expect(normalized).toMatchObject({
      platform: 'facebook',
      socialPostId: '123_456',
      title: 'We helped a candidate land interviews',
      slug: 'we-helped-a-candidate-land-interviews-facebook-123-456',
      imageUrl: 'https://example.com/post.jpg',
      sourceUrl: 'https://facebook.com/example/posts/123',
      status: 'published',
    });
    expect(normalized.content).toContain('Small resume changes can make a big difference.');
    expect(normalized.content).toContain('Need help with jobs, interviews, or career guidance in Australia? Contact 9Jobs today.');
    expect(normalized.publishedAt).toEqual(new Date('2026-06-15T02:00:00.000Z'));
  });

  test('keeps media-specific fields for video social posts', () => {
    const normalized = normalizeSocialPostToBlog({
      platform: 'facebook',
      socialPostId: 'reel_001',
      caption: 'A reel update for job seekers',
      imageUrl: 'https://example.com/fallback.jpg',
      thumbnailUrl: 'https://example.com/thumb.jpg',
      videoUrl: 'https://example.com/reel.mp4',
      sourceUrl: 'https://facebook.com/example/reel/1',
      mediaType: 'video',
      publishedAt: '2026-06-18T02:00:00.000Z',
    });

    expect(normalized).toMatchObject({
      mediaType: 'video',
      imageUrl: 'https://example.com/fallback.jpg',
      thumbnailUrl: 'https://example.com/thumb.jpg',
      videoUrl: 'https://example.com/reel.mp4',
      sourceUrl: 'https://facebook.com/example/reel/1',
    });
  });

  test('defaults mediaType to post when not provided', () => {
    const normalized = normalizeSocialPostToBlog({
      platform: 'facebook',
      socialPostId: 'post_001',
      caption: 'A standard post',
      sourceUrl: 'https://facebook.com/example/post/1',
      publishedAt: '2026-06-18T02:00:00.000Z',
    });

    expect(normalized.mediaType).toBe('post');
    expect(normalized.thumbnailUrl).toBe('');
    expect(normalized.videoUrl).toBe('');
  });
});
