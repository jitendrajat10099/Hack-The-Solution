import {QuickPickItem} from 'vscode';

export const checkerList : QuickPickItem[] = [
    {
        label : 'fcmp.cpp',
        description : "compare files as sequence of lines, doesn't ignore whitespaces"
    },
    {
        label : 'lcmp.cpp',
        description : "compare files as sequence of tokens in lines,ignore whitespaces"
    },


    {
        label : 'ncmp.cpp',
        description : 'compare ordered sequences of signed int64 numbers'
    },
    {
        label : 'wcmp.cpp',
        description :'compare sequences of tokens',
    },

    {
        label : 'nyesno.cpp',
        description :'multiple yes/no, case insensetive'
    },
    {
        label : 'yesno.cpp',
        description :'single yes/no, case insensetive'
    },
    


    {
        label : 'rcmp4.cpp',
        description : 'compare two sequences of doubles, max absolute or relative error = 1E-4'
    },
    {
        label : 'rcmp6.cpp',
        description : 'compare two sequences of doubles, max absolute or relative error = 1E-6'
    },
    {
        label : 'rcmp9.cpp',
        description : 'compare two sequences of doubles, max absolute or relative error = 1E-9'
    },


];


// const checkerEnum : string[] = checkerList.map((item)=>item.label);
// const checkerEnumDescription = checkerList.map((item)=>item.description);