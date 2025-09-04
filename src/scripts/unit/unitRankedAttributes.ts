import { RankedAttribute } from "../attributes/rankedAttributes/rankedAttribute"
import { UnitRankProps } from "./unit";

function getRecordSum(record: Record<string, number>){
    let sum = 0;
    Object.values(record).forEach(value => {
        sum += value;
    })
    return sum;
}

export class UnitRankedAttribute {
    readonly rankedAttribute: RankedAttribute
    additionalModifierBonuses: Record<string, number> = {}
    modifierPenalties: Record<string, number> = {}

    constructor(rankedAttribute: RankedAttribute){
        this.rankedAttribute = rankedAttribute;
    }

    getCheckBonus(): number {
        return this.rankedAttribute.getModifier() +  getRecordSum(this.additionalModifierBonuses) - getRecordSum(this.modifierPenalties);
    }

}

export class UnitRankedAttributes {
    unitRankedAttributes: Record<string, UnitRankedAttribute>

    constructor(unitRankedAttributes: Record<string, UnitRankedAttribute>){
        this.unitRankedAttributes = unitRankedAttributes;
    }

    static initializeRankedAttributesFromRankLetterRecord(unitRankProps: UnitRankProps, modifierValuePerRank: number){

    }

}