import { AdvantageModifier } from "./advantageModifier";

export class RollModifier {
    bonus: number;
    advantageModifier: AdvantageModifier;
    constructor(bonus: number, advantageModifier: AdvantageModifier){
        this.bonus = bonus;
        this.advantageModifier = advantageModifier;
    }

    get value(){
        return this.bonus;
    }
}