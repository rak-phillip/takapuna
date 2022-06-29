// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TakapunaPanel } from './TakapunaPanel';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "takapuna" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('takapuna.helloWorld', () => {
    TakapunaPanel.createOrShow(context.extensionUri);
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
}
