import dotenv from "dotenv"; //dotenv
import path from "path"; //node.js buildin mobule

dotenv.config({ path: path.join(process.cwd(), ".env") }); //-->(currentWorkingDirectory+.env)

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.mongoDbUrl,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_pass: process.env.DEFAULT_PASS,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRCT,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  jwt_access_secret: process.env.JWT_ACCESS_SECRCT,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  frontenUiUrl: process.env.FRONTEND_UI,
  cloud_name: process.env.CLOUD_NAME,
  cloud_api_key: process.env.CLOUD_API_KEY,
  cloud_api_secrect: process.env.CLOUD_API_SECRET,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
};
