import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  update,
  remove,
  push,
  onValue,
  onChildAdded,
} from "firebase/database";
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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const send = document.getElementById("send");
const naiyou = document.getElementById("naiyou");
const postsRef = ref(db, "users/post");

//const dbRef = ref(getDatabase());
/*get(child(postsRef)).then((snapshot) => {
if (snapshot.exists()) {
    console.log(snapshot.val());
} else {
    console.log("No data available");
}
}).catch((error) => {
    console.error(error);
});*/

function H() {
  //overlay.style.display = "block";
  //naiyou.value = "";
}
function AddData() {
  const newPostRef = push(postsRef, {
    post: naiyou.value,
  })
    .then(() => {
      updateView();
      alert("Data Added Successfully");
      //console.log(naiyou.value)
      //let div = document.createElement("div");
      // 親要素に追加
      //list.appendChild(div);
    })
    .catch((error) => {
      alert("Unsuccessful");
      console.log(error);
    });
}
onChildAdded(postsRef, function (snapshot) {
  let data = snapshot.val();
  console.log(data);
});
function updateView() {
  onValue(
    postsRef,
    (snapshot) => {
      console.log(naiyou.value);
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
      //const data = snapshot.val();
      //updateStarCount(postElement, data);
      //}),(error) => {
      //console.log(error);
    },
    (error) => console.log(error)
  );
}
updateView();
send.addEventListener("click", AddData);
send.addEventListener("click", H);
