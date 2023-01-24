const copy = require('recursive-copy');
const args = process.argv.slice(2);

if (args.length !== 1) {
  console.log('Error: target path needed!');
  console.log(args);
  return;
}
const options = {
  overwrite: true,
  filter: ['**/*.graphql'],
};

copy('src', args[0], options);
