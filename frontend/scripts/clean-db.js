const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in env!");
  process.exit(1);
}

async function clean() {
  console.log("Connecting to MongoDB...");
  try {
    await mongoose.connect(MONGODB_URI);
    
    // We define a simple model mapped to the same collection 'servicefeedbacks'
    const ServiceFeedback = mongoose.models.ServiceFeedback || mongoose.model('ServiceFeedback', new mongoose.Schema({
      full_name: String
    }, { collection: 'servicefeedbacks' }));

    console.log("Deleting non-Nafisa testimonials...");
    const result = await ServiceFeedback.deleteMany({
      full_name: { $not: /Nafisa|Nafisha/i }
    });

    console.log(`Deleted ${result.deletedCount} records.`);
  } catch (err) {
    console.error("Error cleaning database:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

clean();
