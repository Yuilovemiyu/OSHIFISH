const FB_USERNAME = "your.facebook.username";
const OWNER_PASSWORD = "1234";
let isOwner = false;

const inputPass = prompt("Owner password (cancel = guest):");
if (inputPass === OWNER_PASSWORD) {
  isOwner = true;
} else {
  document.getElementById("uploadBox").style.display = "none";
}

function addPost() {
  if (!isOwner) return;

  const file = document.getElementById("file").files[0];
  const caption = document.getElementById("caption").value;
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    const url = e.target.result;
    const type = file.type.startsWith("video") ? "video" : "image";

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      ${type === "image" ? `<img src="${url}">` : `<video src="${url}" controls></video>`}
      <p>🐟 ${caption}</p>
      <a class="btn" href="https://m.me/${FB_USERNAME}" target="_blank">💬 Message</a>
      <button class="btn" onclick="this.parentElement.remove()">🗑 Delete</button>
    `;

    document.getElementById("feed").prepend(card);
  };

  reader.readAsDataURL(file);

  document.getElementById("caption").value = "";
  document.getElementById("file").value = "";
}

// bubbles
for (let i = 0; i < 30; i++) {
  const b = document.createElement("div");
  b.className = "bubble";
  b.style = `position:fixed;left:${Math.random()*100}vw;bottom:-20px;width:8px;height:8px;background:white;opacity:0.4;border-radius:50%;animation:rise ${5+Math.random()*10}s infinite`;
  document.body.appendChild(b);
