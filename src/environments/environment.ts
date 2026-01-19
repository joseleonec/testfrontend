export const environment = {
  production: true,
  // Must use relative path /api to trigger the proxy and avoid CORS errors
  apiUrl: '/api',
  auth: {
    username: 'admin',
    password: 'admin'
  }
};
