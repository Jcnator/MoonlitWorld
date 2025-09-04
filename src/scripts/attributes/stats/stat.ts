import { AttributeDerivedStat } from "./attributeDerivedStat";
import { HirearchicalAttributesDerivedStat } from "./hirearchicalAttributeDerivedStat";

export interface StatProps {
    inherentValue?: number,
    statValuesFromAttributes?: Record<string, AttributeDerivedStat>;
}

export class Stat {
    readonly inherentValue: number;
    readonly cumulativeStatValuesFromAttributes?: Record<string, AttributeDerivedStat>;
    readonly hirearchicalStatValueFromAttributes?: HirearchicalAttributesDerivedStat
    value: number;

    constructor(props: StatProps){
        this.inherentValue = props.inherentValue ? props.inherentValue : 0;
        this.cumulativeStatValuesFromAttributes = props.statValuesFromAttributes;
        this.value = this.initializeStatValue();
    }
    
    initializeStatValue(){
        return this.inherentValue + this.getCumulativeStatValueFromAttributes() + this.getHirearchicalAttributesDerivedStat();
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
