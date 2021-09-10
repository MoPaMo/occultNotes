// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
if (!localStorage.hashpwd) {
  localStorage.hashpwd = CryptoJS.SHA256("note");
}
const decrypt = (text, pwd) => {
  return CryptoJS.AES.decrypt(text, pwd).toString(CryptoJS.enc.Utf8);
};
const encrypt = (text, pwd) => {
  return CryptoJS.AES.encrypt(text, pwd).toString();
};
var quill = new Quill("#editor", {
  theme: "snow",
  readOnly: false,
  modules: {
    toolbar: "#toolbar",
  },
});
const checkPwd = () => {
  if (pwdInput.value.length) {
    let hash = localStorage.hashpwd;
    let tryHash = CryptoJS.SHA256(pwdInput.value);
    if (tryHash == hash) {
      pwdScreen.classList.add("hidden");
    }
  }
};
let pwd = "";
let signedin = false;
let pwdInput = document.getElementById("pwd");
let pwdScreen = document.getElementById("login");
pwdInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    checkPwd();
  }
});
