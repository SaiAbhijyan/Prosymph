import * as vscode from "vscode";

export function activate(ctx: vscode.ExtensionContext) {
  const cmd = vscode.commands.registerCommand("orchestrator.rewrite", async () => {
    const target = await vscode.window.showQuickPick(
      ["cursor","chatgpt","claude-code","copilot","kiro","lovable"],
      { placeHolder: "Select target tool" }
    );
    if (!target) return;
    const raw = await vscode.window.showInputBox({ prompt: "Describe what you want (lay prompt)" });
    if (!raw) return;
    const body = JSON.stringify({
      raw_prompt: raw,
      target,
      mode_flags: { vs: true, k: 3, self_adapt: true }
    });
    try {
      const res = await fetch("http://localhost:3000/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body
      });
      const json = await res.json();
      const doc = await vscode.workspace.openTextDocument({ content: JSON.stringify(json, null, 2), language: "json" });
      await vscode.window.showTextDocument(doc, { preview: false });
    } catch (e: any) {
      vscode.window.showErrorMessage(`Rewrite failed: ${e?.message ?? e}`);
    }
  });
  ctx.subscriptions.push(cmd);
}

export function deactivate() {}

