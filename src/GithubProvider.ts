import * as vscode from 'vscode';
import { PatManager } from './PatManager';
import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import { GlobalStateManager } from './GlobalStateManager';

const workspaceFolders = vscode.workspace.workspaceFolders;
const baseDir = workspaceFolders && workspaceFolders[0].uri.fsPath;

const options: Partial<SimpleGitOptions> = {
  baseDir: baseDir,
  binary: 'git',
  maxConcurrentProcesses: 6,
  trimmed: false,
};

const git: SimpleGit = simpleGit(options);

export class GithubProvider {
  _remoteName = 'takapuna.remote-name';
  _remoteUrl = 'takapuna.remote-url';
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

  public listRemote() {
    return vscode.commands.registerCommand(
      'takapuna.selectRemote',
      async () => {
        const remotes = await git.getRemotes(true);
        const quickPickItems = remotes.map(x => { return { label: x.name, description: x.refs.push };});

        vscode.window.showInformationMessage(`Found remotes: ${ remotes.map(x => `${x.name}: ${x.refs.push}` ) }`);

        const remote = await vscode.window.showQuickPick(
          quickPickItems,
          {
            placeHolder: 'Select an upstream repo',
            title: 'Upstream repo for Takapuna',
          }
        );

        if (!remote) {
          vscode.window.showWarningMessage('Remote selection cancelled');
          return;
        }

        await GlobalStateManager.setState(this._remoteName, remote.label);
        await GlobalStateManager.setState(this._remoteUrl, remote.description);

        vscode.window.showInformationMessage(`Selected remote: ${ GlobalStateManager.getState(this._remoteName) } ${ GlobalStateManager.getState(this._remoteUrl) }`);
      }
    );
  }
}

