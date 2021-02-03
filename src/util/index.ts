import {initDirectory} from './initDirectory';
import {compileAll} from './compileAll';
import {outputChannel} from  './outputChannel';
import { runAll } from './runAll';
import {workspace,window} from 'vscode';
import {getIoFilePath } from "./getPaths";
import  {getGenArgument,getTimeOut,getMaxTests} from "./config";



export const index = async()=>{
    try{
        if(!workspace.workspaceFolders){
            window.showErrorMessage('No Workspace is opened');
            return;
        }
        outputChannel.clear();
        outputChannel.show(true);
        window.showInformationMessage('Hack Started');
        await initDirectory();
        const binFiles =await compileAll();
        const ioFiles = await getIoFilePath(binFiles);
        const defaultTimeOut = await getTimeOut();
        const maxTestCase =  await getMaxTests();
        const genArg = await getGenArgument();
        outputChannel.clear();
        // await runAll(binFiles,ioFiles,genArg,0,defaultTimeOut);
        for(var i=1;i<=maxTestCase;i+=10){
            const promises = [];
            for(var j=0;j<=9;j++){
                if(i+j<=maxTestCase){
                    promises.push(runAll(binFiles,ioFiles,genArg,i+j,defaultTimeOut));
                }
            }
            await Promise.all(promises).then().catch((e)=>{
                throw new Error();
            });
        }
        window.showInformationMessage('Hack finished');
    }catch(e){
        window.showWarningMessage('Terminating Program');
        // outputChannel.appendLine('Terminating Program');
    }
    
};
