import { Rank } from "../rank/rank";

export class RankedAttribute {
    rank: Rank;
    modifierValuePerRank: number;
    constructor(rank: Rank, modifier: number){
        this.rank = rank;
        this.modifierValuePerRank = modifier;
    }

    getModifier(): number {
        return this.rank.rankLetter * this.modifierValuePerRank;
    }

    rankUp(){
        this.rank.rankUp();
    }

    rankDown(){
        this.rank.rankDown();
    }
}