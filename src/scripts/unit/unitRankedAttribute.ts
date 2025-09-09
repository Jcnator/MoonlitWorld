import { RankedAttribute } from "../attributes/rankedAttributes/rankedAttribute"
import { RollModifier } from "../rolls/modifiers/rollModifier";
import { getRecordSum } from "../utils/recordUtils";

export class UnitRankedAttribute {
    readonly rankedAttribute: RankedAttribute;
    modifiers: Record<string, RollModifier> = {};

    constructor(rankedAttribute: RankedAttribute){
        this.rankedAttribute = rankedAttribute;
    }

    getCheckBonus(): number {
        return this.rankedAttribute.getModifier() + getRecordSum(this.modifiers);
    }

}
