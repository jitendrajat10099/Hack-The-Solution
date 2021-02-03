export type PromiseObj = {
    code : number,
    stderr : string
};

export interface ConfigInput {
    correctConfig : string,
    waConfig : string,
    genConfig : string,
    checkerConfig : string,
    optionalParamsConfig : string
};

export interface SrcFilePath {
    correct : string,
    wa : string,
    gen : string,
    checker : string
};

export interface BinFilePath {
    correct : string,
    wa : string,
    gen : string,
    checker : string
};

export interface IoFilePath {
    correct : string,
    wa : string,
    input : string
}
