import * as vscode from 'vscode';
import {checkerList} from '../const/checkerList';
import {updateConfig} from './config';
import {index} from './index';

export const takeInput = ()=>{
        const correctInput = vscode.window.createInputBox();
        const waInput = vscode.window.createInputBox();
        const genInput = vscode.window.createInputBox();
        const genArgInput = vscode.window.createInputBox();
        const checkerInput = vscode.window.createQuickPick();

        const showCorrectInput =  ()=>{
            const box = correctInput;
            box.ignoreFocusOut = true;
            box.placeholder = '/correct.cpp';
            box.prompt = 'Give relative path from workspace to correct solution file';
            box.step = 1;
            box.title = 'Correct Solution';
            box.totalSteps = 5;
            box.show();
        
            box.onDidAccept(()=>{
                if(!box.value){
                    box.validationMessage = "Input field can't be empty";
                }
                else if(!box.value.match(/\.(cpp|py|c|java)$/gm)){
                    box.validationMessage = "Only C,C++,Java,Python is supported";
                }
                else{
                    showWaInput();
                }
            });
            box.onDidChangeValue(()=>{
                box.validationMessage="";
            });
        };

        const showWaInput =  ()=>{
            const box = waInput;
            box.buttons = [vscode.QuickInputButtons.Back];
            box.ignoreFocusOut = true;
            box.placeholder = '/wa.cpp';
            box.prompt = 'Give relative path from workspace to WA solution file';
            box.step = 2;
            box.title = 'Wrong Solution';
            box.totalSteps = 5;
            box.show();
        
            box.onDidAccept(()=>{
                if(!box.value){
                    box.validationMessage = "Input field can't be empty";
                }
                else if(!box.value.match(/\.(cpp|py|c|java)$/gm)){
                    box.validationMessage = "Only C,C++,Java,Python is supported";
                }
                else{
                    showGenInput();
                }
            });
            box.onDidChangeValue(()=>{
                box.validationMessage="";
            });
            box.onDidTriggerButton(()=>{
                showCorrectInput();
            });
        };

        const showGenInput =  ()=>{
            const box = genInput;
            box.buttons = [vscode.QuickInputButtons.Back];
            box.ignoreFocusOut = true;
            box.placeholder = '/gen.cpp';
            box.prompt = 'Give relative path from workspace to random test generator file';
            box.step = 3;
            box.title = 'Generator File';
            box.totalSteps = 5; 
            box.show();
        
            box.onDidAccept(()=>{
                if(!box.value){
                    box.validationMessage = "Input field can't be empty";
                }
                else if(!box.value.match(/\.(cpp|py|c|java)$/gm)){
                    box.validationMessage = "Only C,C++,Java,Python is supported";
                }
                else{
                    showGenArgInput();
                }
            });
            box.onDidChangeValue(()=>{
                box.validationMessage="";
            });
            box.onDidTriggerButton(()=>{
                showWaInput();
            });
        };

        const showGenArgInput =  ()=>{
            const box = genArgInput;
            box.buttons = [vscode.QuickInputButtons.Back];
            box.ignoreFocusOut = true;
            box.prompt = 'optional Arguments to Run generator file';
            box.step = 4;
            box.title = '(optional)Arguments';
            box.totalSteps = 5; 
            box.show();
        
            box.onDidAccept(()=>{
                showCheckerInput();
            });
            box.onDidChangeValue(()=>{
                box.validationMessage="";
            });
            box.onDidTriggerButton(()=>{
                showWaInput();
            });
        };

        const showCheckerInput = ()=>{
            const box = checkerInput;
            box.buttons = [vscode.QuickInputButtons.Back];
            box.ignoreFocusOut = true;
            box.items = checkerList;
            box.matchOnDescription = true;
            box.step=5;
            box.title='Checker';
            box.totalSteps=5;
            box.show();

            box.onDidAccept(()=>{
                box.hide();
                start();
            });
            box.onDidTriggerButton(()=>{
                showGenArgInput();
            });
        };

        const start = async()=>{
            await updateConfig({
                correctConfig : correctInput.value,
                checkerConfig : checkerInput.selectedItems[0].label,
                genConfig : genInput.value,
                optionalParamsConfig : genArgInput.value,
                waConfig : waInput.value
            });
            index();
            correctInput.dispose();
            waInput.dispose();
            genInput.dispose();
            genArgInput.dispose();
            checkerInput.dispose();
        };

        if(!vscode.workspace.workspaceFolders){
            vscode.window.showErrorMessage('No Workspace is opened');
        }
        else{
            showCorrectInput();
        }


};