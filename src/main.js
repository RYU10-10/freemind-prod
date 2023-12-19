import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getAuth,onAuthStateChanged } from "firebase/auth";

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

const send = document.getElementById("send");
const naiyou = document.getElementById("naiyou");
const list = document.getElementById("list");
const posts = document.getElementById("posts")
const check=document.getElementById("check")
//const postsRef = ref(db, "users/post");
const userName = document.getElementById("userName");
const now = new Date().toISOString();

onAuthStateChanged(auth, (user) => {
  if(user) {
   userName.innerHTML = user.displayName;
   updateView();
   }
})

function AddData() {
  const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const postsRef = ref(db, "users/" + uid + "/post");
          const newPostRef = push(postsRef, {
            uid: uid,
            post: naiyou.value,
            time: now,
          })
    .then(() => {
      updateView();
      alert("Data Added Successfully");
      //location.href="table.html";
    })
    .catch((error) => {
      alert("Unsuccessful");
      console.log(error);
    });
  }
}
window.showPost = function (elem) {
  const key = elem.dataset.key; // 投稿のキーをデータ属性に
  sessionStorage.setItem("selectedKey", key);

  const post = elem.querySelector("h3").innerHTML;

  sessionStorage.setItem("selectedPost", post);
  window.location.href = "mypage.html";
  document.getElementById("post-viewer").innerHTML = `
    <h1>${post}</h1>
  `;
};

function updateView(){
  var postsHTML = "";
  const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const postsRef = ref(db, "users/" + uid + "/post");
  onValue(
    postsRef,
    (snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        snapshot.forEach((child) => {
          const uid = child.val().uid;
          const postsRef = ref(db, "users/" + uid + "/post");
          const postData = child.val();
          const formattedDate = formatTimestamp(postData.time);
          console.log("タイムスタンプ:", postData.time);
          console.log("フォーマットされた日時:", formattedDate);
          postsHTML += `
          <div onclick="showPost(this)" data-key="${child.key}">
            <h3>${child.val().post}</h3>
            <p>${formattedDate}</p>
            </div>
          `;
        });
        document.getElementById("posts").innerHTML = postsHTML;
      }
    },
    (error) => console.log(error)
  )}else{
    console.log("userがないよ");
  }
}

function formatTimestamp(timestamp) {
  const dateObject = new Date(timestamp);
  const year = dateObject.getFullYear();
  const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObject.getDate()).slice(-2);
  const hours = ("0" + dateObject.getHours()).slice(-2);
  const minutes = ("0" + dateObject.getMinutes()).slice(-2);

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

//updateView();
send.addEventListener("click", AddData);
check.addEventListener("click",updateView);
