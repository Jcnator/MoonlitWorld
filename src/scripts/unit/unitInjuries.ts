import { ExpertiseSkillType, InjurySeverity, ParameterType } from "../../constants/attributeTypes";
import { MIN_MINOR_INJURIES, MIN_MODERATE_INJURIES, MINOR_INJURIES_PER_END_RANK } from "../../constants/derivedStatValuesPerRank";
import { RANK_VALUE } from "../../constants/modifierValuesPerRank";
import { RankedAttribute } from "../attributes/rankedAttributes/rankedAttribute";
import { AttributeDerivedStat } from "../attributes/stats/attributeDerivedStat";
import { VariableStat } from "../attributes/stats/variableStat";

interface UnitInjuriesProps {
    [ParameterType.Endurance]: RankedAttribute;
    [ExpertiseSkillType.Survival]: RankedAttribute
}

export class UnitInjuries {
    minor: VariableStat;
    moderate: VariableStat;
    severe: VariableStat;
    critical: number = 0;

    constructor(props: UnitInjuriesProps){
        this.minor = this.initializeMinorInjuries(props);
        const numModerateInjuries = MINOR_INJURIES_PER_END_RANK/2;
        const numSevereInjuries = numModerateInjuries/2;
        this.moderate = this.initializeInjury(props[ParameterType.Endurance],MIN_MODERATE_INJURIES);
        this.severe = this.initializeInjury(props[ParameterType.Endurance], numSevereInjuries);
    }

    inflictInjuries(amount: number): number {
        if (amount < 0){
            throw new Error("Number of injuries inflicted must be positive");
        }
        const leftOverMinor = this.minor.add(amount);
        const leftOverModerate = this.moderate.add(leftOverMinor);
        const leftOverSevere = this.severe.add(leftOverModerate);
        this.critical += leftOverSevere;
        return leftOverSevere;
    }

    get totalInjuries(): number {
        return this.minor.currentValue + this.moderate.currentValue + this.severe.currentValue + this.critical;
    }

    get injuriesPenalty(): number {
        return this.moderate.currentValue + this.severe.currentValue + this.critical;
    }

    get InjurySeverity(): InjurySeverity {
        if (this.critical > 0){
            return InjurySeverity.Critical;
        }
        if (this.severe.currentValue > 0){
            return InjurySeverity.Severe;
        }
        if (this.moderate.currentValue > 0){
            return InjurySeverity.Moderate;
        }
        if (this.minor.currentValue > 0){
            return InjurySeverity.Minor;
        }
        return InjurySeverity.None;
    }

    isInjured(type: InjurySeverity): boolean {
        switch(type){
            case InjurySeverity.Minor:
                return this.minor.currentValue > 0;
            case InjurySeverity.Moderate:
                return this.moderate.currentValue > 0;
            case InjurySeverity.Severe:
                return this.severe.currentValue > 0;
            case InjurySeverity.Critical:
                return this.critical > 0;
            default:
                return false;
        }
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

    private initializeInjury(endurance: RankedAttribute, numberOfInjuriesPerRank: number, minInjuries?: number){
        const injuriesFromEnd = new AttributeDerivedStat(endurance, numberOfInjuriesPerRank);
        const minorInjuries = new VariableStat({
            cumulativeAttributeDerivedStats: {
                [ParameterType.Endurance]: injuriesFromEnd,
            },
            initialCurrentValue: 0,
            minValue: minInjuries
        });
        return minorInjuries;
    }
}