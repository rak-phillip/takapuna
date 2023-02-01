import * as vscode from 'vscode';
import { PatManager } from './PatManager';

export class GithubProvider {
  constructor(
    private readonly _context: vscode.ExtensionContext
  ) { }

  public activate() {
    return vscode.commands.registerCommand(
      'takapuna.addPat',
      async () => {
        const PAT = await vscode.window.showInputBox({
          placeHolder: 'Github PAT',
          prompt: 'Add a new Github PAT for Takapuna to use',
        });

        if (!PAT) {
          vscode.window.showWarningMessage('Takapuna: Cancelled adding PAT');
          return;
        }

        await PatManager.setToken(PAT);

        vscode.window.showInformationMessage('Takapuna: Successfully added PAT');
      }
    );
  }
}

