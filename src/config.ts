import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';

export class Config {

    public context: vscode.ExtensionContext;
    public get templatesFolderPath(): string {
        return path.join(os.homedir(), `.vscode${path.sep}fish-redux-templates`);
    }

    public get pageTemplatesFolderPath(): string {
        return path.join(os.homedir(), `.vscode${path.sep}fish-redux-templates${path.sep}page`);
    }

    public get componentTemplatesFolderPath(): string {
        return path.join(os.homedir(), `.vscode${path.sep}fish-redux-templates${path.sep}component`);
    }

    public get adapterTemplatesFolderPath(): string {
        return path.join(os.homedir(), `.vscode${path.sep}fish-redux-templates${path.sep}adapter`);
    }
} 

export default new Config();