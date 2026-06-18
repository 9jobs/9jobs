const {
  getPlayableMediaHref,
  shouldOpenMediaExternally,
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
});
