require('dotenv').config({ path: require('path').resolve(__dirname, '..', '..', '.env'), quiet: true });

const path = require('path');
const mongoose = require('mongoose');
const { normalizeSocialPostToBlog } = require('../lib/blog/normalizeSocialPost');

const SOURCE_URL = 'https://www.facebook.com/profile.php?id=61589408708559';

const visiblePosts = [
  {
    platform: 'facebook',
    socialPostId: '17863577814634467',
    mediaType: 'video',
    caption: [
      "Almost giving up on your job search? You're not alone.",
      '',
      "Sometimes, it's not about applying to more Jobs it's about Applying Smarter. At 9Jobs, we help strengthen your Resume, Optimise your Profile, and Support your Job Search so you can put your best foot forward and maximise your chances of getting noticed.",
      '',
      'Ready to stop waiting and start moving forward?',
      '',
      '#AustraliaJobs #JobSearch #CareerGrowth #InterviewTips #ResumeHelp #MelbourneJobs #9Jobs',
    ].join('\n'),
    imageUrl: '/social-imports/2026-06-16-reel.jpg',
    thumbnailUrl: '/social-imports/2026-06-16-reel.jpg',
    sourceUrl: SOURCE_URL,
    publishedAt: '2026-06-16T06:13:00.000Z',
  },
  {
    platform: 'facebook',
    socialPostId: '18223054516319247',
    mediaType: 'post',
    caption: [
      'Most people wait for the “perfect time” to start job hunting.',
      '',
      'End Of Financial Year (EOFY) is one of the few times when that moment is already here. With many Australian businesses reviewing budgets and planning ahead, this June could be your chance to get your resume in front of the right people.',
      '',
      "Our EOFY offer ends on 30 June—don't miss it.",
      '',
      '#EOFY #EndOfFinancialYear #AustraliaJobs #JobSearch #CareerGrowth #MelbourneJobs #9Jobs',
    ].join('\n'),
    imageUrl: '/social-imports/2026-06-15-post.jpg',
    thumbnailUrl: '/social-imports/2026-06-15-post.jpg',
    sourceUrl: SOURCE_URL,
    publishedAt: '2026-06-15T06:00:00.000Z',
  },
  {
    platform: 'facebook',
    socialPostId: '18016046732696206',
    mediaType: 'video',
    caption: [
      'EOFY is ending soon, and so is our limited-time June offer.',
      '',
      'As many Australian businesses review budgets and prepare for new hiring, now is the perfect time to strengthen your job search.',
      '',
      "Don't wait until July take advantage of our EOFY special before 30 June.",
      '',
      '#EOFY #AustraliaJobs #JobSearch #CareerGrowth #9Jobs',
    ].join('\n'),
    imageUrl: '/social-imports/2026-06-14-reel.jpg',
    thumbnailUrl: '/social-imports/2026-06-14-reel.jpg',
    sourceUrl: SOURCE_URL,
    publishedAt: '2026-06-14T06:00:00.000Z',
  },
  {
    platform: 'facebook',
    socialPostId: '18097383044259878',
    mediaType: 'video',
    caption: [
      "End of Financial Year (EOFY) isn't just about finances.",
      '',
      'It is also a time when many Australian businesses review budgets, plan ahead, and often ramp up hiring.',
      '',
      "If you've been putting off your job search, now is the perfect time to strengthen your resume and get in front of the right employers.",
      '',
      "#EOFY #ResumeHelp #AustraliaJobs #9Jobs",
    ].join('\n'),
    imageUrl: '/social-imports/2026-06-13-reel.jpg',
    thumbnailUrl: '/social-imports/2026-06-13-reel.jpg',
    sourceUrl: SOURCE_URL,
    publishedAt: '2026-06-13T06:00:00.000Z',
  },
  {
    platform: 'facebook',
    socialPostId: '18035451107656487',
    mediaType: 'post',
    caption: [
      'EOFY is your chance to reset your career, not just your finances.',
      '',
      'Upgrade your job search before the new financial year with hands-on support from 9Jobs and put yourself in a stronger position for upcoming opportunities.',
      '',
      '#EOFY #JobSearch #CareerGrowth #9Jobs',
    ].join('\n'),
    imageUrl: '/social-imports/2026-06-10-post.jpg',
    thumbnailUrl: '/social-imports/2026-06-10-post.jpg',
    sourceUrl: SOURCE_URL,
    publishedAt: '2026-06-10T06:00:00.000Z',
  },
  {
    platform: 'facebook',
    socialPostId: '17865869643572602',
    mediaType: 'video',
    caption: [
      'Your evenings should belong to you.',
      '',
      'Not to job boards. Not to application forms.',
      '',
      '9Jobs can help make your search more structured and less exhausting.',
      '',
      '#JobSearch #WorkSmarter #9Jobs',
    ].join('\n'),
    imageUrl: '/social-imports/2026-06-08-reel.jpg',
    thumbnailUrl: '/social-imports/2026-06-08-reel.jpg',
    sourceUrl: SOURCE_URL,
    publishedAt: '2026-06-08T06:00:00.000Z',
  },
  {
    platform: 'facebook',
    socialPostId: '17980429019853102',
    mediaType: 'post',
    caption: [
      'More Visibility. More Interviews. More Opportunities.',
      '',
      "Build a stronger profile. Apply strategically. Get noticed. That's the 9Jobs approach.",
      '',
      '#ProfileHelp #Interviews #9Jobs',
    ].join('\n'),
    imageUrl: '/social-imports/2026-06-06-post.jpg',
    thumbnailUrl: '/social-imports/2026-06-06-post.jpg',
    sourceUrl: SOURCE_URL,
    publishedAt: '2026-06-06T06:00:00.000Z',
  },
  {
    platform: 'facebook',
    socialPostId: '18085237787560968',
    mediaType: 'post',
    caption: [
      'Quick question. How many jobs have you applied for this year?',
      '',
      'If the number is high but interviews are still low, the issue may be your resume, targeting, or profile visibility.',
      '',
      '#Applications #ResumeHelp #9Jobs',
    ].join('\n'),
    imageUrl: '/social-imports/2026-06-05-post.jpg',
    thumbnailUrl: '/social-imports/2026-06-05-post.jpg',
    sourceUrl: SOURCE_URL,
    publishedAt: '2026-06-05T06:00:00.000Z',
  },
  {
    platform: 'facebook',
    socialPostId: '18392894737088383',
    mediaType: 'video',
    caption: [
      'Applied to hundreds of jobs and still waiting for a response?',
      '',
      "You're not alone.",
      '',
      'A smarter application strategy can change the outcome.',
      '',
      '#JobSearch #InterviewTips #9Jobs',
    ].join('\n'),
    imageUrl: '/social-imports/2026-06-03-reel.jpg',
    thumbnailUrl: '/social-imports/2026-06-03-reel.jpg',
    sourceUrl: SOURCE_URL,
    publishedAt: '2026-06-03T06:00:00.000Z',
  },
  {
    platform: 'facebook',
    socialPostId: '18089642777345673',
    mediaType: 'video',
    caption: [
      '200 applications. 0 interviews. No idea what is going wrong.',
      '',
      '9Jobs helps job seekers find the bottleneck and fix it with stronger resumes, better profiles, and more strategic applications.',
      '',
      '#AustraliaJobs #ResumeHelp #9Jobs',
    ].join('\n'),
    imageUrl: '/social-imports/2026-06-02-reel.jpg',
    thumbnailUrl: '/social-imports/2026-06-02-reel.jpg',
    sourceUrl: SOURCE_URL,
    publishedAt: '2026-06-02T06:00:00.000Z',
  },
];

async function main() {
  const connect = (await import(`file:///${path.resolve(__dirname, '..', 'lib', 'mongodb.js').replace(/\\/g, '/')}`)).default;
  const SocialBlog = (await import(`file:///${path.resolve(__dirname, '..', 'models', 'SocialBlog.js').replace(/\\/g, '/')}`)).default;

  await connect();

  let upserted = 0;

  for (const item of visiblePosts) {
    const normalized = normalizeSocialPostToBlog(item);
    await SocialBlog.findOneAndUpdate(
      {
        platform: normalized.platform,
        socialPostId: normalized.socialPostId,
      },
      normalized,
      {
        upsert: true,
        returnDocument: 'after',
        setDefaultsOnInsert: true,
      }
    );
    upserted += 1;
  }

  console.log(JSON.stringify({ upserted }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect().catch(() => {});
  });
