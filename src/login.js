import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set} from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut,} from "firebase/auth";

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
const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginButton = document.getElementById("login");

function loginF() {
  signOut(auth).then(() => {
      console.log("logged out");
  signInWithPopup(auth, provider)
    .then((result) => {
      //const domain = result.user.email.split("@")[1];
      // ドメインをチェック
      //if (domain !== "g.neec.ac.jp") {
        // ドメインが一致しない場合はエラー
        //alert("学校のアドレスでログインしてください");
        //console.log("アカウントを変えてね");
        //throw new Error("ドメインが一致せん");
      //}
      // ドメイン一致の場合はログインを許可
      const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const postsRef = ref(db, "users");
          const newPostRef = push(postsRef, {
            uid: uid,
          })
        }
        console.log("認証しました")
      location.href = "SNS.html";
    })
  }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
   });
}

loginButton.addEventListener("click", loginF);
