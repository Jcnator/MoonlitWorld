import { Rank } from "../attributes/rank/rank";
import { RankedAttribute } from "../attributes/rankedAttributes/rankedAttribute"
import { UnitRankProps } from "./unit";
import { UnitRankedAttribute } from "./unitRankedAttribute";


export class UnitRankedAttributesGroup {
    unitRankedAttributes: Record<string, UnitRankedAttribute>

    constructor(unitRankedAttributes: Record<string, UnitRankedAttribute>){
        this.unitRankedAttributes = unitRankedAttributes;
    }

    static initializeRankedAttributesFromRankLetterRecord(attributeRanks: UnitRankProps, modifierValuePerRank: number){
        const rankedAttributes: Record<string, UnitRankedAttribute> = {};
        Object.entries(attributeRanks).forEach(([type, rankLetter]) => {
            const rank = new Rank(rankLetter);
            const rankedAttribute = new RankedAttribute({rank, modifierValuePerRank});
            const unitRankedAttribute = new UnitRankedAttribute(rankedAttribute);
            rankedAttributes[type] = unitRankedAttribute;
        });
        return new UnitRankedAttributesGroup(rankedAttributes);
    }
}