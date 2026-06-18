function getPlayableMediaHref(post = {}) {
  if (post.mediaType === 'video') {
    return post.videoUrl || post.sourceUrl || '';
  }

  return post.sourceUrl || '';
}

function shouldOpenMediaExternally(post = {}) {
  return post.mediaType === 'video' && !post.videoUrl && Boolean(post.sourceUrl);
}

module.exports = {
  getPlayableMediaHref,
  shouldOpenMediaExternally,
};
