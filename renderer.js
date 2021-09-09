// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const decrypt=(text, pwd)=>{
  return CryptoJS.AES.decrypt(text, pwd).toString(CryptoJS.enc.Utf8);
}
const encrypt=(text, pwd)=>{
  return CryptoJS.AES.encrypt(text, pwd).toString();
}
var quill = new Quill('#editor', {
  theme: 'snow',
  readOnly:false,
  modules: {
    toolbar: '#toolbar'
  },
});
