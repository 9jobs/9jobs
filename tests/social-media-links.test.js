const {
  getInlineVideoSrc,
  getFacebookEmbedUrl,
  getPreferredSocialImage,
  getPlayableMediaHref,
  shouldShowOriginalMediaLink,
  shouldOpenMediaExternally,
  shouldUseGeneratedPoster,
} = require('../frontend/lib/blog/socialMedia');

describe('social media playback links', () => {
  test('prefers direct video url for video posts when available', () => {
    const post = {
      mediaType: 'video',
      videoUrl: 'https://cdn.example.com/reel.mp4',
      sourceUrl: 'https://facebook.com/reel/123',
    };

    expect(getPlayableMediaHref(post)).toBe('https://cdn.example.com/reel.mp4');
    expect(shouldOpenMediaExternally(post)).toBe(false);
  });

  test('falls back to source url for video posts without direct video playback', () => {
    const post = {
      mediaType: 'video',
      videoUrl: '',
      sourceUrl: 'https://facebook.com/reel/456',
    };

    expect(getPlayableMediaHref(post)).toBe('https://facebook.com/reel/456');
    expect(shouldOpenMediaExternally(post)).toBe(true);
  });

  test('uses source url for image posts', () => {
    const post = {
      mediaType: 'post',
      sourceUrl: 'https://facebook.com/posts/789',
    };

    expect(getPlayableMediaHref(post)).toBe('https://facebook.com/posts/789');
    expect(shouldOpenMediaExternally(post)).toBe(false);
  });

  test('builds a facebook embed url for reels without direct video files', () => {
    const post = {
      platform: 'facebook',
      mediaType: 'video',
      socialPostId: '17863577814634467',
      videoUrl: '',
      sourceUrl: 'https://www.facebook.com/profile.php?id=61589408708559',
    };

    expect(getFacebookEmbedUrl(post)).toBe(
      'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F17863577814634467&show_text=false&width=1280'
    );
  });

  test('prefers the non-thumbnail image when a low-res imported thumbnail exists', () => {
    const post = {
      imageUrl: 'https://cdn.example.com/high-res.jpg',
      thumbnailUrl: '/social-imports/2026-06-03-reel.jpg',
    };

    expect(getPreferredSocialImage(post)).toBe('https://cdn.example.com/high-res.jpg');
    expect(shouldUseGeneratedPoster(post)).toBe(false);
  });

  test('falls back to generated posters for tiny imported local social images', () => {
    const post = {
      imageUrl: '/social-imports/2026-06-03-reel.jpg',
      thumbnailUrl: '/social-imports/2026-06-03-reel.jpg',
    };

    expect(getPreferredSocialImage(post)).toBe('');
    expect(shouldUseGeneratedPoster(post)).toBe(true);
  });

  test('hides the external media button when a facebook reel can embed locally', () => {
    const post = {
      platform: 'facebook',
      mediaType: 'video',
      socialPostId: '17863577814634467',
      videoUrl: '',
      sourceUrl: 'https://www.facebook.com/profile.php?id=61589408708559',
    };

    expect(shouldShowOriginalMediaLink(post)).toBe(false);
  });

  test('uses a generated local preview video for imported reels without a real video file', () => {
    const post = {
      platform: 'facebook',
      mediaType: 'video',
      imageUrl: '/social-imports/2026-06-16-reel.jpg',
      thumbnailUrl: '/social-imports/2026-06-16-reel.jpg',
      videoUrl: '',
      sourceUrl: 'https://www.facebook.com/profile.php?id=61589408708559',
    };

    expect(getPlayableMediaHref(post)).toBe('/social-imports/2026-06-16-reel.mp4');
    expect(getInlineVideoSrc(post)).toBe('/social-imports/2026-06-16-reel.mp4');
    expect(shouldOpenMediaExternally(post)).toBe(false);
    expect(shouldShowOriginalMediaLink(post)).toBe(false);
  });
});
