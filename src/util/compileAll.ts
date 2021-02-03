import * as path from 'path';
import {workspace} from 'vscode';
import {getSrcPath} from './config';
import {runCommand} from './terminal';
import {BinFilePath} from './types';
import {outputChannel} from './outputChannel';


export const compileAll = async()=>{
    try{
        const folder = workspace.workspaceFolders![0].uri.fsPath;
        const src = await getSrcPath();
        const correct = await compile(src.correct,folder,"");
        const wa = await compile(src.wa,folder,"");
        const gen = await compile(src.gen,folder,"");
        const checker = await compile(src.checker,folder,"");
        return {correct,wa,gen,checker}as BinFilePath;
    }catch(e){
        throw new Error();
    }
};


const getCommand = async(srcFilePath:string,workspaceFolder:string,args:string)=>{
    try{
        let binFileName:string;
        const {name,ext}  = path.parse(srcFilePath);
        console.log(`language is ${ext}`);
        if(ext==='.c'){
            binFileName = path.join(workspaceFolder,`/.hack/bin/${name}.exe`);
            return {
                command : `gcc -o ${binFileName} ${srcFilePath} ${args}`,
                binFileName 
            };
        }
        else if(ext==='.cpp'){
            binFileName = path.join(workspaceFolder,`/.hack/bin/${name}.exe`);
            return {
                command : `g++ -o ${binFileName} ${srcFilePath} ${args}`,
                binFileName
            };
        }
        else if(ext==='.java'){
            let binFileDir = path.join(workspaceFolder,'/.hack/bin/');
            binFileName = path.join(binFileDir,`/${name}.class`);
            return {
                command : `javac ${srcFilePath} -d ${binFileDir} ${args}`,
                binFileName
            };
        }
        else if(ext==='.py'){
            binFileName = srcFilePath;
            return {
                command : `python -m py_compile ${srcFilePath} ${args}`,
                binFileName
            };
        }
        else{
            throw new Error('Language not exists');
        }
    }catch(e){
        console.log('error occured');
        throw new Error();
    }

};


// takes srcFile Path , compiles it
// and return Path to bin file
const compile =  async(srcFilePath:string,workspaceFolder:string,args:string)=>{

    try{
        const {command,binFileName} = await getCommand(srcFilePath,workspaceFolder,args);
        await runCommand(command,undefined);
        outputChannel.appendLine(`compile ${srcFilePath} successful`);
        return binFileName;
    }catch(e){
        outputChannel.appendLine(`Unable to compile ${srcFilePath}`);
        outputChannel.appendLine(`status code : ${e.code}`);
        outputChannel.appendLine('Error Message :');
        outputChannel.appendLine(e.stderr);
        throw new Error();
    }

};


