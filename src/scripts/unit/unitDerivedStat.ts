import { Stat } from "../attributes/stats/stat";
import { getRecordSum } from "../utils/recordUtils";

interface UnitDerivedStatProps {
    readonly stat: Stat;
    readonly specificBonuses?: Record<string, number>;
    readonly specificPenalties?: Record<string, number>;
}

export class UnitDerivedStat {
    readonly stat: Stat;
    readonly specificBonuses: Record<string, number>;
    readonly specificPenalties: Record<string, number>;
    
    constructor(props: UnitDerivedStatProps){
        this.stat = props.stat;
        this.specificBonuses = props.specificBonuses ? props.specificBonuses : {};
        this.specificPenalties = props.specificPenalties ? props.specificPenalties : {};
    }

    getValue(){
        return this.stat.value + getRecordSum(this.specificBonuses) - getRecordSum(this.specificPenalties)
    }
}