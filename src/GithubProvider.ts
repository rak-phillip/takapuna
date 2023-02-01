import * as vscode from 'vscode';

export function activate() {
  return vscode.commands.registerCommand(
    'takapuna.addPat',
    async () => {
      const PAT = await vscode.window.showInputBox({
        placeHolder: 'Github PAT',
        prompt: 'Add a new Github PAT for Takapuna to use',
      });


      vscode.window.showInformationMessage(`YOUR PAT: ${ PAT }`);
    }
  );
}
