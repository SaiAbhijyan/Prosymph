const statusEl = document.getElementById("status");
document.getElementById("go").addEventListener("click", async () => {
  const target = document.getElementById("target").value;
  const raw = document.getElementById("prompt").value.trim();
  const out = document.getElementById("out");
  const copyBtn = document.getElementById("copy");
  out.textContent = "";
  copyBtn.style.display = "none";
  if (!raw) return;
  try {
    statusEl.textContent = "Calling API…";
    const res = await fetch("http://localhost:3000/rewrite?format=text", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ raw_prompt: raw, target, mode_flags:{vs:true,k:3,self_adapt:true} })
    });
    if (!res.ok) {
      const errBody = await res.text().catch(()=> "");
      throw new Error(`HTTP ${res.status} ${res.statusText}${errBody ? ` — ${errBody}` : ""}`);
    }
    const text = await res.text();
    out.textContent = text;
    copyBtn.style.display = "inline-block";
    copyBtn.onclick = async () => {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = "Copied!";
      setTimeout(()=>copyBtn.textContent="Copy", 1200);
    };
    statusEl.textContent = "Done.";
  } catch (e) {
    out.textContent = `Error: ${e?.message || e}`;
    statusEl.textContent = "";
  }
});
