'use strict';

function base64ToArrayBuffer(base64) {
  var buf = Buffer.from(base64, "base64");
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

module.exports = decodeBase64;
