const form = document.querySelector("#form");
const input = document.querySelector("#prompt");
const chat = document.querySelector("#chat");
const statusEl = document.querySelector("#status");

function addMsg(role, text) {
  const div = document.createElement("div");
  div.className = `msg ${role}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function ping() {
  try {
    const r = await fetch("/health");
    if (!r.ok) throw new Error("health not ok");
    statusEl.textContent = "API: OK";
  } catch {
    statusEl.textContent = "API: KO (démarre l’API sur :3000)";
  }
}
ping();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = input.value.trim();
  if (!prompt) return;

  addMsg("user", prompt);
  input.value = "";
  addMsg("assistant", "…");

  const last = chat.lastElementChild;

  try {
    const res = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      last.textContent = `Erreur API: ${res.status}`;
      return;
    }

    const data = await res.json();
    last.textContent = data.text ?? "(réponse vide)";
  } catch (err) {
    last.textContent = `Erreur réseau: ${err.message ?? err}`;
  }
});
