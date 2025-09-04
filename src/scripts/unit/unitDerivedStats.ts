import { Stat } from "../attributes/stats/stat";

export class UnitDerivedStat {
    readonly stats: Record<string, Stat>;
    readonly specificBonus: Record<string, number> = {}
    readonly specificPenalty: Record<string, number> = {}
    
    constructor(){

    }

}