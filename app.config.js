import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    geminiapikey: process.env.GEMINI_API,
  },
});