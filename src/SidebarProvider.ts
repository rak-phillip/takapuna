import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { getNonce } from './getNonce';
import uniqueId from 'lodash.uniqueid';
import { Octokit } from '@octokit/rest';
import { PatManager } from './PatManager';
import { GlobalStateKeys, GlobalStateManager } from './GlobalStateManager';

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  _id = uniqueId();
  _fileName = '';
  _text = '';
  _anchor?: number = undefined;
  _active?: number = undefined;

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _context: vscode.ExtensionContext
  ) { }

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
      case 'onInfo': {
        if (!data.value) {
          return;
        }
        vscode.window.showInformationMessage(data.value);
        break;
      }
      case 'onError': {
        if (!data.value) {
          return;
        }
        vscode.window.showErrorMessage(data.value);
        break;
      }
      case 'request-snippet': {
        this.postSnippet();
        break;
      }
      case 'issue-create': {
        this.issueCreate(data.title, data.body);
        break;
      }
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  public activate() {
    return vscode.commands.registerCommand('takapuna.openSidebar', async () => {
      const { activeTextEditor } = vscode.window;
      
      if (!activeTextEditor) {
        vscode.window.showInformationMessage('No active text editor');
        return;
      }

      await vscode.commands.executeCommand('workbench.view.extension.takapuna-sidebar-view');

      const { anchor, active } = activeTextEditor.selection;
      this._id = uniqueId();
      this._fileName = activeTextEditor.document.fileName;
      this._text = activeTextEditor.document.getText(activeTextEditor.selection);
      this._anchor = anchor.line;
      this._active = active.line;

      this.postSnippet();
    });
  }

  private postSnippet() {
    if (!this._fileName) {
      return;
    }

    const workspaceFolders = vscode.workspace.workspaceFolders;
    const baseDir = workspaceFolders ? workspaceFolders[0].uri.fsPath : '';

    this._view?.webview.postMessage({
      type: 'post-snippet',
      id: this._id,
      fileName: this._fileName,
      relativePath: this._fileName.replaceAll(baseDir, ''),
      value: this._text,
      anchor: this._anchor,
      active: this._active,
    });
  }

  private async issueCreate(title: string, body: string) {
    const authToken = await PatManager.getToken();
    const octokit = new Octokit({
      auth: authToken,
    });
  
    const owner = GlobalStateManager.getState(GlobalStateKeys.RepoOwner);
    const repo = GlobalStateManager.getState(GlobalStateKeys.Repo);
  
    if (!owner || !repo) {
      return;
    }
  
    const response = await octokit.request(
      'POST /repos/{owner}/{repo}/issues',
      {
        owner,
        repo,
        title,
        body,
      }
    );

    vscode.window.showInformationMessage(`Created Issue #${ response.data.number }: ${ response.data.title }`);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css')
    );

    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css')
    );

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'out', 'dist-takapuna-webview', 'assets', 'sideBar.js')
    );

    const stylesVue = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'out', 'dist-takapuna-webview', 'assets', 'sideBar.css')
    );

    const baseUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        'out',
        'dist-takapuna-webview'
      ))
      .toString()
      .replace('%22', '');

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    const htmlTemplateFile = vscode.Uri.file(
      path.join(this._context.extensionPath, 'res', 'html', 'index.html')
    );

    return fs
      .readFileSync(htmlTemplateFile.fsPath, 'utf8')
      .toString()
      .replaceAll('${nonce}', nonce.toString())
      .replaceAll('${webview.cspSource}', webview.cspSource.toString())
      .replaceAll('${scriptUri}', scriptUri.toString())
      .replaceAll('${stylesVue}', stylesVue.toString())
      .replaceAll('${baseUri}', baseUri.toString());

  }
}
