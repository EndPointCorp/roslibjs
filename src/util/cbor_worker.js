var CBOR = require('./cbor');

function findBuffers(o) {
  var buffers = [];

  for (p in o) {
    if (ArrayBuffer.isView(o[p])) {
      buffers.push(o[p]);
    } else if (o.hasOwnProperty(p) && typeof o[p] === 'object') {
      buffers.concat(findBuffers(o[p]));
    }
  }

  return buffers;
}

module.exports = function(self) {
  self.addEventListener('message', function(ev) {
    var request = ev.data;
    var key = request[0];
    var data = request[1];
    var decoded = CBOR.decode(data);

    var transferList = findBuffers(decoded);

    self.postMessage([
      key,
      decoded
    ], transferList);
  });
};
