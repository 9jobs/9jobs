import mongoose from 'mongoose';

const SocialBlogSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      enum: ['facebook', 'linkedin'],
      required: true,
    },
    socialPostId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
    mediaType: {
      type: String,
      enum: ['post', 'video'],
      default: 'post',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    thumbnailUrl: {
      type: String,
      default: '',
    },
    videoUrl: {
      type: String,
      default: '',
    },
    sourceUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: 'published',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

SocialBlogSchema.index({ platform: 1, socialPostId: 1 }, { unique: true });
SocialBlogSchema.index({ slug: 1 });
SocialBlogSchema.index({ status: 1, publishedAt: -1 });

export default mongoose.models.SocialBlog || mongoose.model('SocialBlog', SocialBlogSchema);
