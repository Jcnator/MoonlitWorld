import { RollModifier } from "../modifiers/rollModifier";
import { Dice } from "./dice";

export class DiceRoll {
    dice: Dice;
    rollModifier: RollModifier;
    constructor(dice: Dice, rollModifier: RollModifier){
        this.dice = dice;
        this.rollModifier = rollModifier;
    }
}