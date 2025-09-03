import { Rank } from "../rank/rank";
import { RankedAttribute } from "./rankedAttribute";

export class Skill extends RankedAttribute {
    constructor(rank: Rank, modifierValuePerRank: number){
        super(rank, modifierValuePerRank);
    }

    getRankBonus(): number {
        return this.rank.rankLetter;
    }
}