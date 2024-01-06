import { ref } from "firebase/database";
import { db, auth } from "./firebase";

export function addData(naiyou, updateView) {
  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    const postsRef = ref(db, `users/${uid}/post`);
    const newPostRef = push(postsRef, {
      uid: uid,
      post: naiyou.value,
      time: new Date().toISOString(),
    });

    newPostRef
      .then(() => {
        updateView();
        alert("Data Added Successfully");
      })
      .catch((error) => {
        alert("Unsuccessful");
        console.log(error);
      });
  }
}

export function showPost(elem) {
  const key = elem.dataset.key;
  const post = elem.querySelector("h3").innerHTML;
  sessionStorage.setItem("selectedKey", key);
  sessionStorage.setItem("selectedPost", post);
  sessionStorage.setItem("selectednaiyou", post);
  window.location.href = "mypage.html";
}

export function updateView() {
  var postsHTML = "";
  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    const postsRef = ref(db, `users/${uid}/post`);

    onValue(
      postsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            const postData = child.val();
            const formattedDate = formatTimestamp(postData.time);
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
    );
  } else {
    console.log("userがないよ");
  }
}

export function formatTimestamp(timestamp) {
  const dateObject = new Date(timestamp);
  const year = dateObject.getFullYear();
  const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObject.getDate()).slice(-2);
  const hours = ("0" + dateObject.getHours()).slice(-2);
  const minutes = ("0" + dateObject.getMinutes()).slice(-2);

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}
