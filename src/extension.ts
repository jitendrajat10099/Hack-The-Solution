import * as vscode from 'vscode';
import {takeInput} from './util/takeInput';
import { index } from "./util/index";


export function activate(context: vscode.ExtensionContext) {

	let disposable1 = vscode.commands.registerCommand('hts.startHack',()=>{
		takeInput();
	});

	let disposable2 = vscode.commands.registerCommand('hts.startHackPre',()=>{
		index();
	});

	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() {}
