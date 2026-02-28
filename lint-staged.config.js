module.exports = {
  '*.(js|ts|graphql)': () => [
    'pretty-quick --staged',
    'yarn jest --group=unit --passWithNoTests',
    'yarn lint:fix',
  ],
};
