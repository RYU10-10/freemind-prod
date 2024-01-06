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
const selectedSitumon = sessionStorage.getItem("selectedSitumon");
//console.log("hello:" + selectedPost);

document.getElementById("post-viewer").innerHTML = `
 <h1>${selectedPost}</h1>
 <p>${selectedSitumon}<p>
`;

const selectedKey = sessionStorage.getItem("selectedKey");
console.log("post:" + selectedPost);
console.log("キー:" + selectedKey);

document.getElementById("del").addEventListener("click", handleDelete);

function handleDelete() {
  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    const postsRef = ref(db, "users/" + uid + "/post");

    console.log(selectedKey);

    // 投稿データ削除
    remove(ref(db, "users/" + uid + "/post/" + selectedKey))
      .then(() => {
        // データ削除が成功した場合の処理
        alert("Data Deleted Successfully");
        window.location.href = "table.html";
      })
      .catch((error) => {
        // エラーが発生した場合の処理
        console.error("Data Deletion Unsuccessful", error);
      });
  } else {
    console.log("userがいません");
  }
}
