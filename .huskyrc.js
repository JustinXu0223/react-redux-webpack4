module.exports = {
  hooks: {
    'pre-commit': 'yarn precommit-msg & lint:style & yarn lint:js',
  },
};
