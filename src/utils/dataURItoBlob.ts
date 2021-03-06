function dataURItoBlob(dataURI?: string) {
  if (!dataURI) return;
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  const mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // Old Code
  // write the ArrayBuffer to a blob, and you're done
  // var bb = new BlobBuilder();
  // bb.append(ab);
  // return bb.getBlob(mimeString);

  // New Code
  // eslint-disable-next-line consistent-return
  return new Blob([ab], { type: mimeString });
}

export default dataURItoBlob;
