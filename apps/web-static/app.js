const apiEl = document.getElementById("api");
const keyEl = document.getElementById("key");
const targetEl = document.getElementById("target");
const modeEl = document.getElementById("mode");
const promptEl = document.getElementById("prompt");
const outEl = document.getElementById("out");
const copyBtn = document.getElementById("copy");
const goBtn = document.getElementById("go");
const statusEl = document.getElementById("status");

// bootstrap defaults: query ?api= → localStorage → fallback
const urlParams = new URLSearchParams(location.search);
apiEl.value = urlParams.get("api") || localStorage.getItem("api") || "https://prosymph.onrender.com";
keyEl.value = localStorage.getItem("key") || "";

function setStatus(msg){ statusEl.textContent = msg || ""; }

goBtn.addEventListener("click", async () => {
  const api = apiEl.value.trim();
  const key = keyEl.value.trim();
  const target = targetEl.value;
  const raw = promptEl.value.trim();
  const fmt = modeEl.value;
  localStorage.setItem("api", api);
  localStorage.setItem("key", key);
  outEl.textContent = "";
  copyBtn.style.display = "none";
  if (!raw) { setStatus("Type a prompt to begin."); return; }
  setStatus("Contacting API…");
  try {
    const endpoint = fmt === "json" ? `${api}/rewrite` : `${api}/rewrite?format=text`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(key ? { "X-API-Key": key } : {}) },
      body: JSON.stringify({ raw_prompt: raw, target, mode_flags: { vs: true, k: 3, self_adapt: true } })
    });
    let text;
    if (!res.ok) {
      const errBody = await res.text().catch(()=> "");
      throw new Error(`HTTP ${res.status} ${res.statusText}${errBody ? ` — ${errBody}` : ""}`);
    }
    text = fmt === "json" ? JSON.stringify(await res.json(), null, 2) : await res.text();
    outEl.textContent = text;
    copyBtn.style.display = "inline-block";
    copyBtn.onclick = async () => {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = "Copied!";
      setTimeout(()=>copyBtn.textContent="Copy", 1200);
    };
    setStatus("Done.");
  } catch (e) {
    outEl.textContent = `Error: ${e?.message || e}`;
    setStatus("");
  }
});
