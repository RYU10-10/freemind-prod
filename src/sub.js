import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

const SToukou = document.getElementById("SToukou");
const overlay = document.getElementById("overlay");
const toukou = document.getElementById("toukou");
const list = document.getElementById("list");
const timeline = document.getElementById("timeline");

let title = document.getElementById("title");
let situmon = document.getElementById("situmon");

var text = document.getElementById("text");

window.showPost = function (elem) {
  const key = elem.dataset.key; // 投稿のキーをデータ属性に
  sessionStorage.setItem("selectedKey", key);
  const post = elem.querySelector("h3").innerHTML;
  sessionStorage.setItem("selectedPost", post);
  const situmon = elem.querySelector("p").innerHTML;
  sessionStorage.setItem("selectedSitumon", situmon);
  window.location.href = "mypage_q.html";
};

onAuthStateChanged(auth, (user) => {
  if(user) {
   updateView();
   }
})

function H() {
  overlay.style.display = "block";
  title.value = "";
  situmon.value = "";
}
function AddData() {
  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    const postsRef = ref(db, "users/" + uid + "/question");
    const newPostRef = push(postsRef, {
      uid: uid,
      post: title.value,
      situmon: situmon.value,
    })
      .then(() => {
        updateView();
        alert("Data Added Successfully");
        //let div = document.createElement("div");
        overlay.style.display = "none";
      })
      .catch((error) => {
        alert("Unsuccessful");
        console.log(error);
      });
  }
}

function updateView() {
  let postsHTML = "";
  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    const postsRef = ref(db, "users/" + uid + "/question");
    onValue(
      postsRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        snapshot.forEach((child) => {
          //console.log(${child.val().title});
          postsHTML += `
                <div onclick="showPost(this)" data-key="${child.key}">
                <h3>${child.val().post}</h3>
                <p>${child.val().situmon}</p>
                </div>
              `;
        });
        document.getElementById("posts").innerHTML = postsHTML;
      },
      (error) => console.log(error)
    );
  }
}
SToukou.addEventListener("click", AddData);
toukou.addEventListener("click", H);
