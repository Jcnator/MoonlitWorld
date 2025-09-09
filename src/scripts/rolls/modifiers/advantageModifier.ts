export class AdvantageModifier {
    advantages: number;
    disadvantages: number;
    constructor(advantages: number, disadvantages: number){
        if (advantages < 0 || disadvantages < 0){
            throw new Error("Advantages and disadvantages must be non-negative");
        }
        this.advantages = advantages;
        this.disadvantages = disadvantages;
    }

    get netAdvantage(){
        return this.advantages - this.disadvantages;
    }

    get hasAdvantage(){
        return this.advantages > 0;
    }

    get hasDisadvantage(){
        return this.disadvantages > 0;
    }
}