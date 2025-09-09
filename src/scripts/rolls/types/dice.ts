export class Dice {
    readonly number: number;
    readonly sides: number;
    constructor(number: number, sides: number){
        if (number < 1 || sides < 1){
            throw new Error("Number of dice must be at least 1");
        }
        this.number = number;
        this.sides = sides;
    }
    
    static d4(n: number = 1){
        return new Dice(n,4);
    }

    static d6(n: number = 1){
        return new Dice(n,6);
    }

    static d8(n: number = 1){
        return new Dice(n,8);
    }
    
    static d10(n: number = 1){
        return new Dice(n,10);
    }

    static d12(n: number = 1){
        return new Dice(n,12);
    }

    static d20(n:number = 1){
        return new Dice(n,20);
    }

    static d100(n:number = 1){
        return new Dice(n,100);
    }

    get averageResult(){
        return this.number * (this.sides + 1) / 2;
    }

    get maxResult(){
        return this.number * this.sides;
    }

    get minResult(){
        return this.number;
    }

    get expectedNumberOfMaxFaces(){
        return this.number / this.sides;
    }

}