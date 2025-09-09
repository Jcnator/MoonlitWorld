import { Stat } from "../attributes/stats/stat";
import { RollModifier } from "../rolls/modifiers/rollModifier";
import { getRecordSum } from "../utils/recordUtils";

export interface UnitDerivedStatProps {
    readonly stat: Stat;
    readonly modifiers?: Record<string, RollModifier>;
}

export class UnitDerivedStat {
    readonly stat: Stat;
    readonly modifiers: Record<string, RollModifier>;
    
    constructor(props: UnitDerivedStatProps){
        this.stat = props.stat;
        this.modifiers = props.modifiers ? props.modifiers : {};
    }

    getValue(){
        return this.stat.value + getRecordSum(this.modifiers);
    }
}