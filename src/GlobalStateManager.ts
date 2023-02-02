import * as vscode from 'vscode';

export class GlobalStateManager {
  static globalState: vscode.Memento;

  static setState(key: string, value?: string) {
    return this.globalState.update(key, value);
  }

  static getState(key: string) {
    return this.globalState.get(key);
  }
}
