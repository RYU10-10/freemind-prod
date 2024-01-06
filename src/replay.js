import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const replaysend = document.getElementById("replaysend");
const selectedKey = sessionStorage.getItem("selectedKey");

const selectedPost = sessionStorage.getItem("selectedPost");

const naiyou = document.getElementById("naiyou");
const day_a = new Date().toISOString();

console.log("post_a:" + selectedPost);
console.log("キー_a:" + selectedKey);

function AAddData() {
  const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const postsRef = ref(db, "users/" + uid + "/post"+selectedKey);
          const newCommentRef = push(postsRef);
          set(newCommentRef, {
            uid: uid,
            content_a: naiyou.value,
            day_a: day_a,
          })
    .then(() => {
      //updateView();
      alert("Data Added Successfully");
      //location.href="table.html";
    })
    .catch((error) => {
      alert("Unsuccessful");
      console.log(error);
    });
  }
}


replaysend.addEventListener("click", AAddData);
