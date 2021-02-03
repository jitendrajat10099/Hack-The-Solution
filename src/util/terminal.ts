import {spawn} from 'child_process';
const treeKill= require('tree-kill'); 
import {PromiseObj} from './types';

export const runCommand = async(command:string,defaultTimeOut:number|undefined)=>{
    const now = Date.now();
    // console.log(`default timeout is ${defaultTimeOut}`);
    return new Promise<PromiseObj>((resolve,reject)=>{
        // console.log('executing command : ',command);
        const res = spawn(command,[],{shell:true});
        var stderrData = '';
        res.stderr.on('data',(data)=>{
            stderrData += data.toString();
        });
        res.on('close',(code)=>{
            const fin = Date.now();
            if(code===0){
                resolve({code,stderr:stderrData});
            }
            else {
                reject({code,stderr:stderrData});
            }
        });
        

        //timeout 
        if(defaultTimeOut!==undefined){
            const timer = setTimeout(()=>{
                treeKill(res.pid,'SIGKILL');
                stderrData='TimeLimit Exceed';
            },4000);
    
            res.on('exit',(code)=>{
                clearTimeout(timer);
            });
        }

    });
};

