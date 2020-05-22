const SpoilTomatoes = require('./SpoilTomatoes');

function rottenTomatoes(grid) {
  const spoilTomatoe = new SpoilTomatoes(grid)
  return spoilTomatoe.getTimeOfSpread()
}


module.exports = rottenTomatoes;
