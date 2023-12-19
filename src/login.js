import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3R_xD_ZKuausjMYIWsGuka3w9XlAxA-Y",
  authDomain: "fir-v10-fa879.firebaseapp.com",
  databaseURL: "https://fir-v10-fa879-default-rtdb.firebaseio.com",
  projectId: "fir-v10-fa879",
  storageBucket: "fir-v10-fa879.appspot.com",
  messagingSenderId: "51654346876",
  appId: "1:51654346876:web:23017fc57b01172f2361f9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const loginButton = document.getElementById("login");

function loginF() {
  signInWithPopup(auth, provider)
    .then((result) => {
      location.href = "post.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

loginButton.addEventListener("click", loginF);
