require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  SECRET: process.env.SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_PROJECT_ID : process.env.GOOGLE_PROJECT_ID,
  GOOGLE_BUCKET_NAME : process.env.GOOGLE_BUCKET_NAME,
}