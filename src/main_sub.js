import { addData, showPost, updateView } from "./functions";

document.getElementById("send").addEventListener("click", () => {
  addData(document.getElementById("naiyou"), updateView);
});

document.getElementById("check").addEventListener("click", updateView);
