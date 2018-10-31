'use strict';

var work = require('webworkify');

var decodeBase64 = require('./decodeBase64');
var decodeCallbackIndex = 0;
var decodeCallbacks = {};
var worker = work(require('./cbor_worker.js'))

/**
 * Decode a CBOR payload.
 *
 * @private
 * @param data - object containing the CBOR data.
 * @param callback - function with params:
 *   * data - the uncompressed data
 */
function decodeCbor(data, callback) {
  //var debased = decodeBase64(data);
  var key = decodeCallbackIndex++;
  decodeCallbacks[key] = callback;
  let request = [
    key,
    data
  ];
  worker.postMessage(request, [data]);
}

worker.addEventListener('message', function handleDecodedCbor(ev) {
  var response = ev.data;
  var key = response[0];
  var data = response[1];
  var callback = decodeCallbacks[key];
  delete decodeCallbacks[key];
  callback(data);
});

module.exports = decodeCbor;
