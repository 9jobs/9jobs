const mongoose = require('mongoose');
const { getPreferredSocialImage } = require('./lib/blog/socialMedia');

const MONGODB_URI = "mongodb+srv://mayanksodhi:KeTsP5iW7OU3bxkH@modern.4v4hgir.mongodb.net/?appName=modern";

const SocialBlogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  mediaType: String,
  imageUrl: String,
  thumbnailUrl: String,
  videoUrl: String,
  sourceUrl: String,
  platform: String,
  status: String,
  publishedAt: Date
});

const SocialBlog = mongoose.models.SocialBlog || mongoose.model('SocialBlog', SocialBlogSchema);

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");
  const posts = await SocialBlog.find({ status: "published" }).sort({ publishedAt: -1 }).limit(10);
  for (const post of posts) {
    const serialized = {
      title: post.title,
      imageUrl: post.imageUrl,
      thumbnailUrl: post.thumbnailUrl,
      mediaType: post.mediaType,
      publishedAt: post.publishedAt
    };
    const img = getPreferredSocialImage(serialized);
    console.log(`Title: "${post.title}"`);
    console.log(`PublishedAt: ${post.publishedAt} (${typeof post.publishedAt})`);
    console.log(`Preferred Image: "${img}"`);
    console.log("------------------------");
  }
  await mongoose.disconnect();
}

run().catch(console.error);
