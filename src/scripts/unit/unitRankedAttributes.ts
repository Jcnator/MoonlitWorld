import { RankedAttribute } from "../attributes/rankedAttributes/rankedAttribute"
import { RankLetter } from "../attributes/rank/rankLetter";
import { Rank } from "../attributes/rank/rank";
import { UnitRankProps } from "./unit";

export class UnitRankedAttributes {
    rankedAttributes: Record<string, RankedAttribute>;
    specificBonus: Record<string, number> = {}
    specificPenalty: Record<string, number> = {}

    constructor(rankedAttributes: Record<string, RankedAttribute>){
        this.rankedAttributes = rankedAttributes;
    }

    static initializeRankedAttributesFromRankLetterRecord(attributeRanks: UnitRankProps, modifierValuePerRank: number){
        const rankedAttributes: Record<string, RankedAttribute> = {};
        Object.entries(attributeRanks).forEach(([type, rankLetter]) => {
            const rank = new Rank(rankLetter);
            const rankedAttribute = new RankedAttribute(rank, modifierValuePerRank);
            rankedAttributes[type] = rankedAttribute;
        });
        return new UnitRankedAttributes(rankedAttributes);
    }

    
        getCheckBonus(attributeType: string): number {
            return this.rankedAttributes[attributeType].getModifier() + this.specificBonus[attributeType] + this.specificPenalty[attributeType];
        }

}