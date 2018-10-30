'use strict';

function decodeBase64(base64) {
  // strip tail padding, because it breaks atob
  //var stripped = base64.replace(/=+$/, "");
  //var raw = atob(stripped);
  var raw = atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(rawLength);

  for(var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array.buffer;
}

module.exports = decodeBase64;
