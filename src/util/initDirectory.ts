import * as vscode from 'vscode';
import * as path from 'path';
const fse = require('fs-extra');


export const initDirectory = ()=>{

    return new Promise<void>( async (resolve,reject)=>{

        console.log('Making Folders');
        const folders = vscode.workspace.workspaceFolders;
        if(!folders){
            reject(new Error('No workspace is open'));
            return;
        }
        const fileCorrect = path.join(folders[0].uri.fsPath,'/.hack/files/correct');
        const fileWa = path.join(folders[0].uri.fsPath,'/.hack/files/wa');
        const fileInput = path.join(folders[0].uri.fsPath,'/.hack/files/input');
        const exec = path.join(folders[0].uri.fsPath,'/.hack/bin');
        
        try{
            await fse.ensureDir(fileCorrect);
            await fse.ensureDir(fileWa);
            await fse.ensureDir(fileInput);
            await fse.ensureDir(exec);
            resolve();
        }catch(e){
            console.log(e);
            reject(new Error('Unable to initialize the directory'));
        }

    });

    
};