import { RankLetter, ParameterRankLetter } from "../attributes/rank/rankLetter";
import { ParameterType, ExpertiseSkillType, MartialSkillType, SaintGraphNonHumanSkills } from "../../constants/attributeTypes";
import { UnitRankedAttributesGroup } from "./unitRankedAttributesGroup";
import { PARAMETER_MODIFIER_VALUE_PER_RANK, RANK_VALUE, SKILL_MODIFIER_VALUE_PER_RANK } from "../../constants/modifierValuesPerRank";
import { VariableStat } from "../attributes/stats/variableStat";
import { UnitDerivedStat } from "./unitDerivedStat";
import { AttributeDerivedStat } from "../attributes/stats/attributeDerivedStat";
import { FATE_DICE_PER_LUCK_RANK, HP_VALUE_PER_END_RANK, INHERENT_MOVEMENT_VALUE, MANA_VALUE_PER_MAG_RANK, MIN_HP_VALUE } from "../../constants/derivedStatValuesPerRank";
import { Stat } from "../attributes/stats/stat";
import { UnitInjuries } from "./unitInjuries";

export interface UnitProps {
    unitParameterProps: UnitParameterRankProps;
    unitSkillProps: UnitSkillsRankProps;
    unitSaintGraphSkillProps: UnitSaintGraphSkillProps
}

export interface UnitRankProps {
    [key: string]: RankLetter | ParameterRankLetter
}

interface UnitParameterRankProps extends UnitRankProps {
    [ParameterType.Strength]: ParameterRankLetter;
    [ParameterType.Endurance]: ParameterRankLetter;
    [ParameterType.Agility]: ParameterRankLetter;
    [ParameterType.Magic]: ParameterRankLetter;
    [ParameterType.Luck]: ParameterRankLetter;
}

interface UnitSkillsRankProps {
    unitExpertiseSkillsProps: UnitExpertiseSkillsProps,
    unitMartialSkillsProps: UnitMartialSkillsProps
}

interface UnitExpertiseSkillsProps extends UnitRankProps{
    [ExpertiseSkillType.Academia]: RankLetter,
    [ExpertiseSkillType.Riding]: RankLetter,
    [ExpertiseSkillType.Stealth]: RankLetter,
    [ExpertiseSkillType.Survival]: RankLetter,
    [ExpertiseSkillType.Technology]: RankLetter
}

interface UnitMartialSkillsProps extends UnitRankProps{
    [MartialSkillType.HandToHand]: RankLetter,
    [MartialSkillType.Marksmanship]: RankLetter,
    [MartialSkillType.WeaponMastery]: RankLetter
}

interface UnitSaintGraphSkillProps {
    unitMagecraftMasteryProps: UnitRankProps,
    unitMysticEyesProps: UnitRankProps,
    unitNonHumanRankProps: UnitNonHumanRanksProps
}

interface UnitNonHumanRanksProps extends UnitRankProps {
    [SaintGraphNonHumanSkills.DeadApostle]: RankLetter,
    [SaintGraphNonHumanSkills.Homunculus]: RankLetter,
    [SaintGraphNonHumanSkills.MixedBlood]: RankLetter,
    [SaintGraphNonHumanSkills.Psychic]: RankLetter
}

export class Unit {
    readonly name: string;

    readonly parameters: UnitRankedAttributesGroup;
    readonly expertiseSkills: UnitRankedAttributesGroup;
    readonly martialSkills: UnitRankedAttributesGroup;
    readonly magecraftMasteries: UnitRankedAttributesGroup;
    readonly mysticEyes: UnitRankedAttributesGroup;
    readonly nonHumanRanks: UnitRankedAttributesGroup;

    readonly hitPoints: VariableStat;
    readonly injuries: UnitInjuries;
    readonly mana: VariableStat;
    readonly fateDice: VariableStat;
    readonly initiative: UnitDerivedStat;
    readonly movement: VariableStat


    constructor(name: string, unitProps: UnitProps) {
        this.name = name;
        this.parameters = UnitRankedAttributesGroup.initializeRankedAttributesFromRankLetterRecord(unitProps.unitParameterProps, PARAMETER_MODIFIER_VALUE_PER_RANK);

        const unitSkillProps = unitProps.unitSkillProps;
        this.expertiseSkills = UnitRankedAttributesGroup.initializeRankedAttributesFromRankLetterRecord(unitSkillProps.unitExpertiseSkillsProps, SKILL_MODIFIER_VALUE_PER_RANK);
        this.martialSkills = UnitRankedAttributesGroup.initializeRankedAttributesFromRankLetterRecord(unitSkillProps.unitMartialSkillsProps, SKILL_MODIFIER_VALUE_PER_RANK);

        const unitSaintGraphSkilLProps = unitProps.unitSaintGraphSkillProps;
        this.magecraftMasteries = UnitRankedAttributesGroup.initializeRankedAttributesFromRankLetterRecord(unitSaintGraphSkilLProps.unitMagecraftMasteryProps, SKILL_MODIFIER_VALUE_PER_RANK);
        this.mysticEyes = UnitRankedAttributesGroup.initializeRankedAttributesFromRankLetterRecord(unitSaintGraphSkilLProps.unitMysticEyesProps, PARAMETER_MODIFIER_VALUE_PER_RANK);
        this.nonHumanRanks = UnitRankedAttributesGroup.initializeRankedAttributesFromRankLetterRecord(unitSaintGraphSkilLProps.unitNonHumanRankProps, PARAMETER_MODIFIER_VALUE_PER_RANK);

        this.hitPoints = this.initializeHitPoints();
        this.mana = this.initializeMana();
        this.fateDice = this.initializeFateDice();
        this.injuries = new UnitInjuries({
            [ParameterType.Endurance]: this.parameters.unitRankedAttributes[ParameterType.Endurance].rankedAttribute,
            [ExpertiseSkillType.Survival]: this.expertiseSkills.unitRankedAttributes[ExpertiseSkillType.Survival].rankedAttribute
        });

        this.initiative = this.initializeInititiative();
        this.movement = this.initializeMovement();
    }

    private initializeHitPoints() {
        const endurance = this.parameters.unitRankedAttributes[ParameterType.Endurance].rankedAttribute;
        const hitPointsFromEnd = new AttributeDerivedStat(endurance, HP_VALUE_PER_END_RANK);
        const hitPoints = new VariableStat({
            minValue: MIN_HP_VALUE,
            cumulativeAttributeDerivedStats: {
                [ParameterType.Endurance]: hitPointsFromEnd
            }
        });
        return hitPoints;
    }

    private initializeMana(){
        const magic = this.parameters.unitRankedAttributes[ParameterType.Magic].rankedAttribute;
        const manaFromMag = new AttributeDerivedStat(magic, MANA_VALUE_PER_MAG_RANK);
        const mana = new VariableStat({
            cumulativeAttributeDerivedStats: {
                [ParameterType.Magic]: manaFromMag
            }
        });
        return mana;
    }

    private initializeFateDice(){
        const luck = this.parameters.unitRankedAttributes[ParameterType.Luck].rankedAttribute;
        const fateDiceFromLuk = new AttributeDerivedStat(luck, FATE_DICE_PER_LUCK_RANK);
        const fateDice = new VariableStat({
            cumulativeAttributeDerivedStats: {
                [ParameterType.Luck]: fateDiceFromLuk
            },
            initialCurrentValue: fateDiceFromLuk.getStatValue()
        });
        return fateDice;
    }

    private initializeInititiative(){
        const agility = this.parameters.unitRankedAttributes[ParameterType.Agility].rankedAttribute;
        const initiativeFromAgility = new AttributeDerivedStat(agility, RANK_VALUE);
        const initiative = new Stat({
            cumulativeAttributeDerivedStats: {
                [ParameterType.Agility]: initiativeFromAgility
            }
        });
        const unitInitiative = new UnitDerivedStat({
            stat: initiative
        });
        return unitInitiative;
    }

    private initializeMovement(){
        const agility = this.parameters.unitRankedAttributes[ParameterType.Agility].rankedAttribute;
        const additionalMovementFromAgility = new AttributeDerivedStat(agility, RANK_VALUE);
        const strength = this.parameters.unitRankedAttributes[ParameterType.Strength].rankedAttribute;
        const additionalMovementFromStrength = new AttributeDerivedStat(strength, RANK_VALUE);
        const movement = new VariableStat({
            inherentValue: INHERENT_MOVEMENT_VALUE,
            cumulativeAttributeDerivedStats: {
                [ParameterType.Agility]: additionalMovementFromAgility,
                [ParameterType.Strength]: additionalMovementFromStrength
            }
        });
        return movement;
    }
};