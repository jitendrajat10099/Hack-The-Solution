import {workspace} from 'vscode';
import * as path from 'path';
import {SrcFilePath,ConfigInput} from './types';
const fse = require('fs-extra');

// fetch config settings and copy checker
// return SrcFile type object if success
// else return error


export const getSrcPath = ()=>{
    return new Promise<SrcFilePath>((resolve,reject)=>{

        const correctConfig:string|undefined = workspace.getConfiguration('hts').get('path.correctSolution');
        const waConfig:string|undefined = workspace.getConfiguration('hts').get('path.wrongSolution');
        const genConfig:string|undefined = workspace.getConfiguration('hts').get('path.generatorFile');
        const checkerConfig:string|undefined = workspace.getConfiguration('hts').get('checker');
        const folders = workspace.workspaceFolders;
        if(!folders){
            reject(new Error('No workspace is open'));
            return;
        }
        const curFolder = folders[0].uri.fsPath;

        if(correctConfig && waConfig && genConfig && checkerConfig){
            const correct = path.join(curFolder,correctConfig);
            const wa = path.join(curFolder,waConfig);
            const gen = path.join(curFolder,genConfig);
            const checker = path.join(__dirname,`../../defaultCheckers/${checkerConfig}`);
            resolve({correct,wa,gen,checker});
        }else{
            reject(new Error('some configs are empty'));
        }
    });
};

export const getGenArgument = ()=>{
    return new Promise<string>((resolve,reject)=>{
        const folders = workspace.workspaceFolders;
        if(!folders){
            return;
        }
        const arg = workspace.getConfiguration("hts").get('generator.argument') as string;
        resolve(arg);
    });
};

export const getTimeOut = ()=>{
    return new Promise<number>((resolve,reject)=>{
        const folders = workspace.workspaceFolders;
        if(!folders){
            return;
        }
        const arg = workspace.getConfiguration("hts").get('general.timeOut') as number;
        resolve(arg);
    });
};

export const getMaxTests = ()=>{
    return new Promise<number>((resolve,reject)=>{
        const folders = workspace.workspaceFolders;
        if(!folders){
            return;
        }
        const arg = workspace.getConfiguration("hts").get('general.maxTests') as number;
        resolve(arg);
    });
};


export const updateConfig = 
    async ({correctConfig,checkerConfig,genConfig,optionalParamsConfig,waConfig}:ConfigInput)=>{
        const folders = workspace.workspaceFolders;
        if(!folders){
            return;
        }
        await workspace.getConfiguration('hts').update('path.correctSolution',correctConfig,false);
        await workspace.getConfiguration("hts").update('path.wrongSolution',waConfig,false);
        await workspace.getConfiguration("hts").update('path.generatorFile',genConfig,false);
        await workspace.getConfiguration("hts").update('checker',checkerConfig,false);
        await workspace.getConfiguration("hts").update('generator.argument',optionalParamsConfig,false);
    };