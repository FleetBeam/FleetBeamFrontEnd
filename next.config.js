/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  '@mui/x-data-grid',
]); // Add other packages if needed

module.exports = withTM({
  reactStrictMode: true,
});