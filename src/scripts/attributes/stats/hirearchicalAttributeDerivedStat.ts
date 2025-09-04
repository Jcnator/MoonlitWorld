import { AttributeDerivedStat } from "./attributeDerivedStat";

export class HirearchicalAttributesDerivedStat {
    readonly statValuesFromAttributes: Record<string, AttributeDerivedStat>;
    
    constructor(statValuesFromAttributes: Record<string, AttributeDerivedStat>){
        this.statValuesFromAttributes = statValuesFromAttributes;
    }

    getStatByHighestAttributeValue(): AttributeDerivedStat {
        let highestValue = -Infinity;
        let statName = "";
        Object.entries(this.statValuesFromAttributes).forEach(derivedStat => {
            const name = derivedStat[0];
            const stat = derivedStat[1];
            if(stat.getStatValue() > highestValue){
                highestValue = stat.getStatValue();
                statName = name;
            }
        });
        return this.statValuesFromAttributes[statName];
    }
}