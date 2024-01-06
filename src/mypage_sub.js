export function displaySelectedNaiyou() {
  const selectedNaiyou = sessionStorage.getItem("selectednaiyou");
  const textarea = document.getElementById("naiyou");
  textarea.value = selectedNaiyou;
}
