import { RankedAttribute } from "../attributes/rankedAttributes/rankedAttribute"
import { getRecordSum } from "../utils/recordUtils";

export class UnitRankedAttribute {
    readonly rankedAttribute: RankedAttribute;
    additionalModifierBonuses: Record<string, number> = {};
    modifierPenalties: Record<string, number> = {};

    constructor(rankedAttribute: RankedAttribute){
        this.rankedAttribute = rankedAttribute;
    }

    getCheckBonus(): number {
        return this.rankedAttribute.getModifier() + getRecordSum(this.additionalModifierBonuses) - getRecordSum(this.modifierPenalties);
    }

}
