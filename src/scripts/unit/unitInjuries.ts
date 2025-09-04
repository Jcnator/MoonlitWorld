import { ExpertiseSkillType, ParameterType } from "../../constants/attributeTypes";
import { MIN_MINOR_INJURIES, MINOR_INJURIES_PER_END_RANK } from "../../constants/derivedStatValuesPerRank";
import { RANK_VALUE } from "../../constants/modifierValuesPerRank";
import { RankedAttribute } from "../attributes/rankedAttributes/rankedAttribute";
import { AttributeDerivedStat } from "../attributes/stats/attributeDerivedStat";
import { VariableStat } from "../attributes/stats/variableStat";
import { UnitDerivedStat } from "./unitDerivedStat";

interface UnitInjuriesProps {
    [ParameterType.Endurance]: RankedAttribute;
    [ExpertiseSkillType.Survival]: RankedAttribute
}

export class UnitInjuries {
    minor: VariableStat;
    moderate: VariableStat;
    severe: VariableStat;
    critical: VariableStat;

    constructor(props: UnitInjuriesProps){
        this.minor = this.initializeMinorInjuries(props);
    }

    private initializeMinorInjuries(props: UnitInjuriesProps){
        const minorInjuriesFromEnd = new AttributeDerivedStat(props[ParameterType.Endurance], MINOR_INJURIES_PER_END_RANK);
        const minorInjuriesFromSurvival = new AttributeDerivedStat(props[ExpertiseSkillType.Survival], RANK_VALUE);
        const minorInjuries = new VariableStat({
            cumulativeAttributeDerivedStats: {
                [ParameterType.Endurance]: minorInjuriesFromEnd,
                [ExpertiseSkillType.Survival]: minorInjuriesFromSurvival
            },
            initialCurrentValue: 0,
            minValue: MIN_MINOR_INJURIES
        });
        return minorInjuries;
    }

    private 
}