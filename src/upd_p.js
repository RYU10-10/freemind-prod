import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from "firebase/database";
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
const naiyou = document.getElementById("naiyou");
const now = new Date().toISOString();

document.getElementById("post-viewer").innerHTML = `
 <h1>${selectedPost}</h1>
`;

document.addEventListener("DOMContentLoaded", function () {
  // sessionStorage から selectednaiyou の値を取得
  const selectedNaiyou = sessionStorage.getItem("selectednaiyou");

  // 取得した値を textarea に表示
  const textarea = document.getElementById("naiyou");
  textarea.value = selectedNaiyou;
});

const selectednaiyou=sessionStorage.getItem("selectednaiyou")
console.log("hello:" + selectednaiyou);
const selectedKey = sessionStorage.getItem("selectedKey");
console.log("キー:" + selectedKey);

document.getElementById("upd").addEventListener("click", handleupd);

function handleupd() {
  console.log("123456");
  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    const postsRef = ref(db, "users/" + uid + "/post");
    console.log(selectedKey);

    // データを更新する
    update(ref(db, "users/" + uid + "/post/" + selectedKey), {
      post: naiyou.value,
      time: now,
    })
      .then(() => {
        // データの更新が成功した場合の処理
        alert("Data Updated Successfully");
        window.location.href = "table.html";
      })
      .catch((error) => {
        // エラーが発生した場合の処理
        console.error("Data Update Unsuccessful", error);
      });
  } else {
    console.log("ユーザーがいません");
  }
}
