import { RankedAttribute } from "../rankedAttributes/rankedAttribute";

export class AttributeDerivedStat {
    readonly rankedAttribute: RankedAttribute;
    readonly valuePerRankOfAttribute: number;

    constructor(rankedAttribute: RankedAttribute, valuePerRankOfAttribute: number){
        this.rankedAttribute = rankedAttribute;
        this.valuePerRankOfAttribute = valuePerRankOfAttribute;
    }

    getStatValue(){
        return this.rankedAttribute.rank.rankLetter * this.valuePerRankOfAttribute;
    }
}