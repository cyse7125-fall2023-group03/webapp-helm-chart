module.exports = {
  branches: ['origin/main'], // Add the branches you want to publish from
  plugins: [
    '@semantic-release/commit-analyzer', // Analyzes commits to determine version bump
    '@semantic-release/release-notes-generator', // Generates release notes
    '@semantic-release/github', // Creates a GitHub release
  ]
};
