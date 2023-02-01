import * as vscode from 'vscode';

const KEY = 'takapuna.token';

export class PatManager {
  static globalState: vscode.Memento;

  static setToken(token?: string) {
    return this.globalState.update(KEY, token);
  }

  static getToken() {
    return this.globalState.get(KEY);
  }
}
