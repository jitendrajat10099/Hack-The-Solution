import * as vscode from 'vscode';
import * as path from 'path';
const fse = require('fs-extra');
import {BinFilePath,IoFilePath} from './types'; 

export const getIoFilePath = (binFiles:BinFilePath)=>{

    return new Promise<IoFilePath>( async (resolve,reject)=>{

        console.log('Getting paths');
        const folders = vscode.workspace.workspaceFolders;
        if(!folders){
            reject(new Error('No workspace is open'));
            return;
        }
        resolve( {
            correct : path.join(folders[0].uri.fsPath,'/.hack/files/correct/correct'),
            wa : path.join(folders[0].uri.fsPath,'/.hack/files/wa/wa'),
            input : path.join(folders[0].uri.fsPath,'/.hack/files/input/input'),
        });
    });  
};