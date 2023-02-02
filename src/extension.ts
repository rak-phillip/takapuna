// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';
import { TakapunaPanel } from './TakapunaPanel';
import { GithubProvider } from './GithubProvider';
import { PatManager } from './PatManager';
import { GlobalStateManager } from './GlobalStateManager';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  GlobalStateManager.globalState = context.globalState;
  PatManager.globalState = context.globalState;

  const sidebarProvider = new SidebarProvider(context.extensionUri, context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'takapuna-sidebar',
      sidebarProvider
    )
  );

  const githubProvider = new GithubProvider(context);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('takapuna.helloWorld', () => {
    TakapunaPanel.createOrShow(context.extensionUri, context);
  });

  const refresh = vscode.commands.registerCommand('takapuna.refresh', async () => {
    // TakapunaPanel.kill();
    // TakapunaPanel.createOrShow(context.extensionUri);
    await vscode.commands.executeCommand('workbench.action.closeSidebar');
    await vscode.commands.executeCommand('workbench.view.extension.takapuna-sidebar-view');
    setTimeout(() => { 
      vscode.commands.executeCommand('workbench.action.webview.openDeveloperTools');
    }, 500);
  });

  const question = vscode.commands.registerCommand('takapuna.askQuestion', async () => {
    const answer = await vscode.window.showInformationMessage('how was your day?', 'good', 'bad');

    if (answer === 'bad') {
      vscode.window.showInformationMessage('sorry to hear that');
      return;
    }

    console.log({ answer });

  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(question);
  context.subscriptions.push(refresh);
  context.subscriptions.push(sidebarProvider.activate());
  context.subscriptions.push(githubProvider.activate());
}
