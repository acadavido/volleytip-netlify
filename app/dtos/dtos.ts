export interface SetDto {
    local: number;
    visitor: number;
    isSideSwitched: boolean
}


export enum ETeam {
    LOCAL = "LOCAL",
    VISITOR = "VISITOR"
}