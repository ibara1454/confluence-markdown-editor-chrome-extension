module.exports = {
  rules: {
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true, // enable devDependencies import under this directory
      optionalDependencies: false,
    }]
  },
};
