import * as vscode from 'vscode';

export enum GlobalStateKeys {
  RemoteName = 'takapuna.remote-name',
  RemoteUrl = 'takapuna.remote-url',
  RepoOwner = 'takapuna.repo-owner',
  Repo = 'takapuna.repo'
}

export class GlobalStateManager {
  static globalState: vscode.Memento;

  static setState(key: string, value?: string) {
    return this.globalState.update(key, value);
  }

  static getState(key: string) {
    return this.globalState.get(key);
  }
}
