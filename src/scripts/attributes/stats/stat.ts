import { AttributeDerivedStat } from "./attributeDerivedStat";
import { HirearchicalAttributesDerivedStat } from "./hirearchicalAttributeDerivedStat";

export interface StatProps {
    inherentValue?: number,
    minValue?: number;
    cumulativeAttributeDerivedStats?: Record<string, AttributeDerivedStat>;
    hirearchicalAttribtueDerivedStats?: HirearchicalAttributesDerivedStat;
}

export class Stat {
    readonly inherentValue: number;
    readonly minValue: number;
    readonly cumulativeStatValuesFromAttributes?: Record<string, AttributeDerivedStat>;
    readonly hirearchicalStatValueFromAttributes?: HirearchicalAttributesDerivedStat
    value: number;

    constructor(props: StatProps){
        this.inherentValue = props.inherentValue ? props.inherentValue : 0;
        this.minValue = props.minValue ? props.minValue : 0;
        this.cumulativeStatValuesFromAttributes = props.cumulativeAttributeDerivedStats;
        this.hirearchicalStatValueFromAttributes = props.hirearchicalAttribtueDerivedStats;
        this.value = this.initializeStatValue();
    }

    initializeStatValue(){
        const valueFromStats = this.getCumulativeStatValueFromAttributes() + this.getHirearchicalAttributesDerivedStat();
        const derivedValue = this.inherentValue + valueFromStats;
        return Math.max(this.minValue, derivedValue);
    }

    updateStatValue(){
        this.value = this.initializeStatValue();
    }

    private getCumulativeStatValueFromAttributes(){
        if(this.cumulativeStatValuesFromAttributes){
            let sum = 0;
            Object.values(this.cumulativeStatValuesFromAttributes).forEach(derivedStat => {
                sum += derivedStat.getStatValue();
            });
            return sum;
        }
        return 0;
    }

    private getHirearchicalAttributesDerivedStat(){
        if(this.hirearchicalStatValueFromAttributes){
            return this.hirearchicalStatValueFromAttributes.getStatByHighestAttributeValue().getStatValue();
        }
        return 0;
    }
}
