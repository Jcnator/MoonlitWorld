import { Rank } from "../rank/rank";
import { RankedAttribute } from "./rankedAttribute";

export class Parameter extends RankedAttribute {
    constructor(rank: Rank, modifierValuePerRank: number){
        super(rank, modifierValuePerRank);
    }
}