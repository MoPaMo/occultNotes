// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const decrypt = (text, pwd) => {
  return CryptoJS.AES.decrypt(text, pwd).toString(CryptoJS.enc.Utf8);
};
const encrypt = (text, pwd) => {
  return CryptoJS.AES.encrypt(text, pwd).toString();
};
const debounce = (func, wait, immediate) => {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
const storeData = () => {
  localStorage.encdata = encrypt(JSON.stringify(quill.getContents()), pwd);
};
if (!localStorage.hashpwd) {
  localStorage.hashpwd = CryptoJS.SHA256("note");
  pwd="note"
}
if (!localStorage.encdata) {
  localStorage.encdata = encrypt("", "note");
}

var quill = new Quill("#editor", {
  theme: "snow",
  readOnly: false,
  modules: {
    toolbar: "#toolbar",
  },
});
quill.on("text-change", debounce(storeData, 500, false));
let data = "";
let signedin = false;

const checkPwd = () => {
  if (pwdInput.value.length) {
    let hash = localStorage.hashpwd;
    let tryHash = CryptoJS.SHA256(pwdInput.value);
    if (tryHash == hash) {
      pwdScreen.classList.add("hidden");
      signedin = true;
      pwd = pwdInput.value;
      quill.setContents(JSON.parse(decrypt(localStorage.encdata, pwd)));
    }
  }
};
function newPwd() {
  if (signedin) {
    console.log("newpwd");
    let p = document.getElementById("newIn").value;
    if (p.length) {
      pwd = p;
      localStorage.hashpwd = CryptoJS.SHA256(pwd);
      localStorage.encdata = encrypt(JSON.stringify(quill.getContents()), pwd);
      alert("Successfully changed password. New password:" + p);
    } else {
      alert("Password can't be whitespace");
    }
  }
}
let pwd = "";
let pwdInput = document.getElementById("pwd");
let pwdScreen = document.getElementById("login");
pwdInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    checkPwd();
  }
});
document.getElementById("loginBtn").addEventListener("click", (e) => {
  checkPwd();
});
document.getElementById("newBtn").addEventListener("click", ()=>{console.log("hi");newPwd()});
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    if (event.matches) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  });
