import * as path from "path";
import {runCommand} from './terminal';
import {BinFilePath,IoFilePath} from './types';
import {outputChannel} from "./outputChannel";


export const runAll = async (bin:BinFilePath,io:IoFilePath,genArg:string,index:number,defaultTimeOut:number)=>{
    try{
        const files:IoFilePath = {
            correct : io.correct+`${(index%10).toString()}.txt`,
            wa : io.wa + `${(index%10).toString()}.txt`,
            input : io.input + `${(index%10).toString()}.txt`
        };
        await runGenerator(bin.gen,files.input,genArg,index.toString(),defaultTimeOut);
        await run(bin.correct,files.correct,files.input,index.toString(),defaultTimeOut);
        await run(bin.wa,files.wa,files.input,index.toString(),defaultTimeOut);
        await judge(bin.checker,files.input,files.wa,files.correct,index.toString(),defaultTimeOut);
    }catch(e){
        throw new Error();
    }
};



const run = async(binFilePath:string,outputFilePath:string,inputFilePath:string,index:string,defaultTimeOut:number)=>{
    try{
        const command = await getCommand(binFilePath,outputFilePath,inputFilePath);
        await runCommand(command,defaultTimeOut);
    }catch(e){
        outputChannel.appendLine(`On testcase ${index} unable to run ${binFilePath}`);
        outputChannel.appendLine(`status code : ${e.code}`);
        outputChannel.appendLine('Error Message :');
        outputChannel.appendLine(e.stderr);
        throw new Error();
    }
};

const runGenerator = async(binFilePath:string,outputFilePath:string,generatorArg:string,index:string,defaultTimeOut:number)=>{
    try{
        const command = await getCommand2(binFilePath,outputFilePath,generatorArg,index);
        await runCommand(command,defaultTimeOut);
        outputChannel.appendLine(`testcase ${index} generated successfully`);
    }catch(e){
        outputChannel.appendLine(`Unable to run Generator ${binFilePath}`);
        outputChannel.appendLine(`status code : ${e.code}`);
        outputChannel.appendLine('Error Message :');
        outputChannel.appendLine(e.stderr);
        throw new Error();
    }
};

const judge = async(execChecker:string,inputFile:string,outputFile:string,answerFile:string,index:string,defaultTimeOut:number)=>{
    try{
        const command = `${execChecker} ${inputFile} ${outputFile} ${answerFile}`;
        const {stderr} = await runCommand(command,defaultTimeOut);
        if(stderr.substr(0,2)!=='ok'){
            throw new Error(stderr);
        }
        else{
            outputChannel.appendLine(`Test ${index} : ${stderr}`);
        }
    }catch(e){
        outputChannel.appendLine('Bug found : ');
        outputChannel.appendLine(`Test ${index} : ${e.stderr}`);
        outputChannel.appendLine(`input for test${index} : ${inputFile}`);
        outputChannel.appendLine(`wrong output for test ${index} : ${outputFile}`);
        outputChannel.appendLine(`correct output for test ${index} : ${answerFile}`);
        outputChannel.appendLine('');
        throw new Error();
    }
};


const getCommand = async(binFilePath:string,outputFilePath:string,inputFilePath:string)=>{
    try{
        const {ext}  = path.parse(binFilePath);
        if(ext==='.exe' || ext==='.class'){
            return  `${binFilePath} > ${outputFilePath} < ${inputFilePath}`;
        }
        else if(ext==='.py'){
            return `python ${binFilePath} > ${outputFilePath} < ${inputFilePath}`;
        }
        else{
            throw new Error('Language not exists');
        }
    }catch(e){
        throw new Error();
    }

};

const getCommand2 = async(binFilePath:string,outputFilePath:string,generatorArg:string,index:string)=>{
    try{
        const {ext}  = path.parse(binFilePath);
        if(ext==='.exe' || ext==='.class'){
            return  `${binFilePath} ${generatorArg} > ${outputFilePath} ${index}`;
        }
        else if(ext==='.py'){
            return `python ${binFilePath} > ${outputFilePath} ${index}`;
        }
        else{
            throw new Error('Language not exists');
        }
    }catch(e){
        throw new Error();
    }

};