var currentProcessEnv = process.env.NODE_ENV.toUpperCase();
const providers = ["google", "github"];

const callbacks = providers.map(provider => {
  return (
    process.env[`${currentProcessEnv}_SOCKET_SERVER`] +
    `/auth/${provider}/callback`
  );
});

const [googleURL, githubURL] = callbacks;
exports.CLIENT_ORIGIN =
  process.env[`${currentProcessEnv}_SOCKET_CLIENT_ORIGIN`];

exports.GOOGLE_CONFIG = {
  clientID: process.env[`${currentProcessEnv}_GOOGLE_KEY`],
  clientSecret: process.env[`${currentProcessEnv}_GOOGLE_SECRET`],
  callbackURL: googleURL
};

exports.GITHUB_CONFIG = {
  clientID: process.env[`${currentProcessEnv}_GITHUB_KEY`],
  clientSecret: process.env[`${currentProcessEnv}_GITHUB_SECRET`],
  callbackURL: githubURL,
  scope: ["user:email"]
};
