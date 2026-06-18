# Social Blog Media Import Design

Date: 2026-06-18

## Goal

Fix the 9Jobs blog social feed so visible Facebook boost-page items appear reliably on the website, support both posts and reels, open when clicked, and remain responsive across mobile, tablet, and desktop.

## Problems

- Imported social cards can render with broken thumbnails because Facebook CDN URLs are unstable.
- The current `SocialBlog` model only treats items as generic text/image posts.
- Reels/videos do not have first-class support in list or detail views.
- The current website UX does not clearly separate dynamic social items from static blog articles.

## Approved Approach

1. Extend the social content model to support media-aware content:
   - `mediaType`
   - `thumbnailUrl`
   - `videoUrl`
   - keep `imageUrl`, `sourceUrl`, `content`, `publishedAt`
2. Add a repeatable importer path for currently visible Facebook boost-page items.
3. Store stable local thumbnails for visible imported items to avoid broken image rendering.
4. Update `/blog` and `/blog/[slug]` to:
   - show dynamic social items clearly
   - support both post and video/reel cards
   - open detail pages on click
   - show a playable/visual video state for reels
   - remain fully responsive on all device sizes
5. Re-seed the visible social items into MongoDB, then verify locally and redeploy to Vercel.

## UX Notes

- Social items should appear at the top of the blog listing.
- Video cards should show a play affordance even when a local thumbnail is used.
- Detail pages should show:
  - video player if a stable video file exists
  - otherwise a strong visual poster with clear CTA to open the original post/reel
- Cards should not collapse or overflow on narrow screens.

## Verification

- Automated tests for social normalization and media-aware record generation.
- Local verification that `/blog` shows imported social cards.
- Local verification that a social detail page opens and renders its media block.
- Production redeploy after verification.
