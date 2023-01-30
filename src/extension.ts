// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';
import { TakapunaPanel } from './TakapunaPanel';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri, context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'takapuna-sidebar',
      sidebarProvider
    )
  );

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('takapuna.helloWorld', () => {
    TakapunaPanel.createOrShow(context.extensionUri, context);
	});

	const refresh = vscode.commands.registerCommand('takapuna.refresh', async () => {
    // TakapunaPanel.kill();
    // TakapunaPanel.createOrShow(context.extensionUri);
    await vscode.commands.executeCommand("workbench.action.closeSidebar");
    await vscode.commands.executeCommand("workbench.view.extension.takapuna-sidebar-view");
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

  const openSidebar = vscode.commands.registerCommand('takapuna.openSidebar', async () => {
    const { activeTextEditor } = vscode.window;
    
    if (!activeTextEditor) {
      vscode.window.showInformationMessage("No active text editor");
      return;
    }

    const { anchor, active } = activeTextEditor.selection;
    const text = activeTextEditor.document.getText(activeTextEditor.selection);

    sidebarProvider._view?.webview.postMessage({
      type: 'new-snippet',
      value: text,
      anchor: anchor.line,
      active: active.line,
    });

    await vscode.commands.executeCommand("workbench.view.extension.takapuna-sidebar-view");
  });

	context.subscriptions.push(disposable);
	context.subscriptions.push(question);
	context.subscriptions.push(refresh);
  context.subscriptions.push(openSidebar);
}
