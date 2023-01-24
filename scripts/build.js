var shell = require('shelljs');

if (shell.exec('tsc -p tsconfig.prod.json --incremental false --tsBuildInfoFile null').code !== 0) {
  shell.echo('Error: tsc failed');
  shell.exit(1);
}

if (shell.exec('node scripts/copy-schema build/src').code !== 0) {
  shell.echo('Error: copy schema failed');
  shell.exit(1);
}

shell.cp('-R', 'package.json', 'build');
shell.cp('-R', 'yarn.lock', 'build');

shell.sed('-i', /\s*["]prepare["].*/, '', './build/package.json');
/*
shell.cd('build');
if (shell.exec('yarn --immutable').code !== 0) {
  shell.echo('Error: yarn failed');
  shell.exit(1);
}
*/
