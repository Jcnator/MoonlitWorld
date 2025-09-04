import { Stat, StatProps } from "./stat";

interface VariableStatProps extends StatProps {
    initialCurrentValue?: number
}

export class VariableStat extends Stat {
    currentValue: number;

    constructor(props: VariableStatProps){
        super(props);
        this.currentValue = props.initialCurrentValue ? props.initialCurrentValue : this.value;
    }

    add(value: number): number {
        const sum = value + this.currentValue;
        if (sum > this.value){
            const leftOver = sum - this.currentValue;
            this.currentValue = this.value;
            return leftOver;
        }
        return 0;
    }

    subtract(value: number): number {
       if(value < 0){
            throw new Error("Value must be postive");
       }
       const subtraction = this.currentValue - value;
        if(subtraction < 0){
            const leftOver = Math.abs(subtraction);
            this.currentValue = 0;
            return leftOver;
        }
        return 0;
    }

    updateStatValue(): void {
        const valueProportion = this.currentValue / this.value;
        this.value = this.initializeStatValue();
        this.currentValue = Math.floor(valueProportion * this.currentValue);
    }
}