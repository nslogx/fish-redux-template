'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import * as util from './util';
const fs = require('fs');
import config from './config';

import { window } from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    const subscribe = context.subscriptions.push.bind(context.subscriptions) as typeof context.subscriptions.push;
    const registerCommand = (command: string, callback: (...args: any[]) => any, thisArg?: any) =>
        subscribe(vscode.commands.registerCommand(command, callback, thisArg));

    // Generate Fish-Redux Page Template
    registerCommand('extension.GenerateFishReduxPageTemplate', async (uri) => {
        try {
            await util.checkTemplatesFolder(context);
            let pathname = '';
            window.showInputBox(
                {
                    password: false,
                    ignoreFocusOut: true,
                    placeHolder: 'Please input page name',
                    validateInput: async function (text) {
                        pathname = await util.generateFolderPath(text, 'page', uri);
                        return await util.checkFolderIsExits(pathname) ? 'Oops! Page Already Exits' : null;
                    }
                }).then(async function (text) {
                    if (!text) { return; }
                    util.copyFolder(config.pageTemplatesFolderPath, pathname);
                });
        } catch (error) {
            vscode.window.showErrorMessage(`Fish-Redux-Template: ${error.message}`);
        }
    });

    // Generate Fish-Redux Component Template
    registerCommand('extension.GenerateFishReduxComponentTemplate', async (uri) => {
        try {
            await util.checkTemplatesFolder(context);
            let pathname = '';
            window.showInputBox(
                {
                    password: false,
                    ignoreFocusOut: true,
                    placeHolder: 'Please input component name',
                    validateInput: async function (text) {
                        pathname = await util.generateFolderPath(text, 'component', uri);
                        return await util.checkFolderIsExits(pathname) ? 'Oops! Component Already Exits' : null;
                    }
                }).then(async function (text) {
                    if (!text) { return; }
                    util.copyFolder(config.componentTemplatesFolderPath, pathname);
                });
        } catch (error) {
            vscode.window.showErrorMessage(`Fish-Redux-Template: ${error.message}`);
        }
    });

    // Generate Fish-Redux Adapter Template
    registerCommand('extension.GenerateFishReduxAdapterTemplate', async (uri) => {
        try {
            await util.checkTemplatesFolder(context);
            let pathname = '';
            window.showInputBox(
                {
                    password: false,
                    ignoreFocusOut: true,
                    placeHolder: 'Please input adapter name',
                    validateInput: async function (text) {
                        pathname = await util.generateFolderPath(text, 'adapter', uri);
                        return await util.checkFolderIsExits(pathname) ? 'Oops! Adapter Already Exits' : null;
                    }
                }).then(async function (text) {
                    if (!text) { return; }
                    util.copyFolder(config.adapterTemplatesFolderPath, pathname);
                });
        } catch (error) {
            vscode.window.showErrorMessage(`Fish-Redux-Template: ${error.message}`);
        }
    });

    // Open Fish-Redux Template Folder
    registerCommand('extension.OpenFishReduxTemplateFolder', async () => {
        try {
            await util.checkTemplatesFolder(context);
            let uri = vscode.Uri.file(config.templatesFolderPath);
            vscode.commands.executeCommand('vscode.openFolder', uri, true);
        } catch (error) {
            vscode.window.showErrorMessage(`Fish-Redux-Template: ${error.message}`);
        }
    });
}
