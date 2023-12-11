import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";
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

const send = document.getElementById("send");
const naiyou = document.getElementById("naiyou");
const list = document.getElementById("list");
const postsRef = ref(db, "users/post");

function AddData() {
  const newPostRef = push(postsRef, {
    post: naiyou.value,
  })
    .then(() => {
      updateView();
      alert("Data Added Successfully");
    })
    .catch((error) => {
      alert("Unsuccessful");
      console.log(error);
    });
}
window.showPost = function (elem) {
  const post = elem.innerHTML;

  document.getElementById("post-viewer").innerHTML = `
    <h1>${post}</h1>
  `;
};
function updateView() {
  var postsHTML = "";
  onValue(
    postsRef,
    (snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        snapshot.forEach((child) => {
          postsHTML += `
          <div onclick="showPost(this)">
            <h3>${child.val().post}</h3>
            </div>
          `;
        });
        document.getElementById("posts").innerHTML = postsHTML;
      }
    },
    (error) => console.log(error)
  );
}
updateView();
send.addEventListener("click", AddData);
