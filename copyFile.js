var fs = require('fs');
var yargs = require('yargs');

var source = yargs.argv.source;
var destination = yargs.argv.destination;
var override = yargs.argv.override;

if (source && destination && fs.existsSync(source)) {
  if (!fs.existsSync(destination) || override) {
    fs.copyFileSync(source, destination);
    // eslint-disable-next-line no-console
    console.log(`Copied ${source} to ${destination}`);
  }
}
process.exit();
