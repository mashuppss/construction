
const config = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Disable Next.js Image Optimization API
  },
  // If deploying to a subdirectory on GitHub Pages (e.g., https://username.github.io/repo-name),
  // uncomment and set the basePath and assetPrefix.
  // basePath: '/repo-name',
  // assetPrefix: '/repo-name/',
  reactStrictMode: true,
}

export default config
