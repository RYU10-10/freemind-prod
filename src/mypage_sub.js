import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove } from "firebase/database";
import { getAuth } from "firebase/auth";

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

const selectedPost = sessionStorage.getItem("selectedPost");
//const postsRef = ref(db, "users/post");

document.getElementById("post-viewer").innerHTML = `
 <h1>${selectedPost}</h1>
`;

const selectedKey = sessionStorage.getItem("selectedKey");
console.log("post:" + selectedPost);
console.log("キー:" + selectedKey);

document.getElementById("del").addEventListener("click", () => {
  // 投稿データ削除
  //const postRef = ref(db, "users/post/" + selectedKey);
  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    remove(ref(db, "users/"+uid+"post/" + selectedKey));
  // ページ遷移
  window.location.href = "table.html";
  }
});
