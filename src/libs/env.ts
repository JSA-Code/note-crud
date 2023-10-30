import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  MONGODB_URI: str(),
  GITHUB_ID: str(),
  GITHUB_SECRET: str(),
});

export default env;
