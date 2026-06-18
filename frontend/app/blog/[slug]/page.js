import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, Play } from 'lucide-react';
import { notFound } from 'next/navigation';
import connectMongoDB from '@/lib/mongodb';
import SocialBlog from '@/models/SocialBlog';
import { BlogSupportLinks } from '../../../components/RelatedSeoLinks';
import { JsonLd, createArticleSchema, createBreadcrumbSchema, createSeoMetadata } from '../../../data/seo';

export const dynamic = 'force-dynamic';

function formatDate(date) {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

function formatUiLabel(value) {
  const text = String(value || '').trim();
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function serializePost(post) {
  return {
    title: post.title,
    slug: post.slug,
    content: post.content || '',
    mediaType: post.mediaType || 'post',
    imageUrl: post.imageUrl || '',
    thumbnailUrl: post.thumbnailUrl || '',
    videoUrl: post.videoUrl || '',
    sourceUrl: post.sourceUrl || '',
    platform: post.platform,
    publishedAt: post.publishedAt,
  };
}

async function getSocialBlogPost(slug) {
  if (!process.env.MONGODB_URI) {
    return null;
  }

  try {
    await connectMongoDB();
    const post = await SocialBlog.findOne({ slug, status: 'published' }).lean();
    return post ? serializePost(post) : null;
  } catch (error) {
    console.error('Social blog lookup failed:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getSocialBlogPost(slug);

  if (!post) {
    return {
      title: 'Blog Post | 9Jobs',
    };
  }

  return {
    ...createSeoMetadata({
      title: `${post.title} | 9Jobs`,
      description: post.content.slice(0, 155),
      path: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: new Date(post.publishedAt).toISOString(),
      modifiedTime: new Date(post.publishedAt).toISOString(),
    }),
  };
}

export default async function SocialBlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await getSocialBlogPost(slug);

  if (!post) {
    notFound();
  }

  const paragraphs = post.content.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const platformLabel = formatUiLabel(post.platform === 'linkedin' ? 'LinkedIn' : 'Facebook');
  const mediaLabel = post.mediaType === 'video' ? 'Reel' : 'Post';
  const mediaImage = post.thumbnailUrl || post.imageUrl || '';
  const description = post.content.slice(0, 155);
  const articleSchema = createArticleSchema({
    title: post.title,
    description,
    path: `/blog/${post.slug}`,
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.publishedAt).toISOString(),
  });
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <main className="site-main fj-page">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={articleSchema} />
      <section className="fj-page-hero">
        <div className="fj-container">
          <Link href="/blog" className="fj-social-back-link">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <span className="fj-announcement"><span>Blog</span> {platformLabel} {mediaLabel.toLowerCase()}</span>
          <h1>{post.title}</h1>
          <p>{formatDate(post.publishedAt)} - Published from {platformLabel} as a {mediaLabel.toLowerCase()}</p>
        </div>
      </section>

      <BlogSupportLinks />

      <section className="fj-section fj-section--tight">
        <article className="fj-container fj-social-detail">
          {post.mediaType === 'video' && post.videoUrl ? (
            <video
              className="fj-social-detail-video"
              controls
              playsInline
              preload="metadata"
              poster={mediaImage || undefined}
              src={post.videoUrl}
            />
          ) : mediaImage ? (
            <div className="fj-social-detail-media">
              <img className="fj-social-detail-image" src={mediaImage} alt="" loading="lazy" decoding="async" />
              {post.mediaType === 'video' && (
                <span className="fj-social-play-badge fj-social-play-badge--detail" aria-hidden="true">
                  <Play size={24} fill="currentColor" />
                </span>
              )}
            </div>
          ) : post.mediaType === 'video' ? (
            <div className="fj-social-detail-media fj-social-detail-media--empty" aria-hidden="true">
              <span className="fj-social-play-badge fj-social-play-badge--detail">
                <Play size={24} fill="currentColor" />
              </span>
            </div>
          ) : null}

          <div className="fj-social-detail-meta">
            <span className="fj-badge">{platformLabel}</span>
            <span className="fj-badge fj-badge--ghost">{mediaLabel}</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>

          <div className="fj-social-detail-content">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {post.sourceUrl && (
            <a className="fj-button fj-button--dark" href={post.sourceUrl} target="_blank" rel="noopener noreferrer">
              Open original {mediaLabel.toLowerCase()} <ExternalLink size={16} />
            </a>
          )}
        </article>
      </section>

      <section className="fj-section fj-section--tight">
        <div className="fj-container fj-final-cta">
          <span>Career Support</span>
          <h2>Need practical help with your next application?</h2>
          <Link className="fj-button fj-button--dark" href="/contact">
            Contact 9Jobs <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
