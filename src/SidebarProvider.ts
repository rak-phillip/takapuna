import * as vscode from "vscode";
import * as path from 'path';
import * as fs from 'fs';
import { getNonce } from "./getNonce";

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

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
        case "onInfo": {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.value);
          break;
        }
        case "onError": {
          if (!data.value) {
            return;
          }
          vscode.window.showErrorMessage(data.value);
          break;
        }
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );

    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    );

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "out", "dist-takapuna-webview", 'assets', 'sideBar.js')
    );

    const stylesVue = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "out", "dist-takapuna-webview", 'assets', 'sideBar.css')
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
