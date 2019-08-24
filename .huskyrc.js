module.exports = {
  hooks: {
    'pre-commit': 'yarn precommit-msg && yarn lint:js',
  },
};
