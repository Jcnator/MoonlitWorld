import { RankLetter, ParameterRankLetter } from "../attributes/rank/rankLetter";
import { ParameterType, ExpertiseSkillType, MartialSkillType, SaintGraphNonHumanSkills } from "../../constants/attributeTypes";
import { UnitRankedAttribute } from "./unitRankedAttributes";
import { PARAMETER_MODIFIER_VALUE_PER_RANK, SKILL_MODIFIER_VALUE_PER_RANK } from "../../constants/modifierValuesPerRank";
import { VariableStat } from "../attributes/stats/variableStat";

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
    readonly parameters: UnitRankedAttributes;
    readonly expertiseSkills: UnitRankedAttributes;
    readonly martialSkills: UnitRankedAttributes;
    readonly magecraftMasteries: UnitRankedAttributes;
    readonly mysticEyes: UnitRankedAttributes;
    readonly nonHumanRanks: UnitRankedAttributes;

    readonly hitPoints: VariableStat;
    readonly mana: VariableStat;
    readonly fateDice: VariableStat;


    constructor(name: string, unitProps: UnitProps) {
        this.name = name;
        this.parameters = UnitRankedAttributes.initializeRankedAttributesFromRankLetterRecord(unitProps.unitParameterProps, PARAMETER_MODIFIER_VALUE_PER_RANK);

        const unitSkillProps = unitProps.unitSkillProps;
        this.expertiseSkills = UnitRankedAttributes.initializeRankedAttributesFromRankLetterRecord(unitSkillProps.unitExpertiseSkillsProps, SKILL_MODIFIER_VALUE_PER_RANK);
        this.martialSkills = UnitRankedAttributes.initializeRankedAttributesFromRankLetterRecord(unitSkillProps.unitMartialSkillsProps, SKILL_MODIFIER_VALUE_PER_RANK);

        const unitSaintGraphSkilLProps = unitProps.unitSaintGraphSkillProps;
        this.magecraftMasteries = UnitRankedAttributes.initializeRankedAttributesFromRankLetterRecord(unitSaintGraphSkilLProps.unitMagecraftMasteryProps, SKILL_MODIFIER_VALUE_PER_RANK);
        this.mysticEyes = UnitRankedAttributes.initializeRankedAttributesFromRankLetterRecord(unitSaintGraphSkilLProps.unitMysticEyesProps, PARAMETER_MODIFIER_VALUE_PER_RANK);
        this.nonHumanRanks = UnitRankedAttributes.initializeRankedAttributesFromRankLetterRecord(unitSaintGraphSkilLProps.unitNonHumanRankProps, PARAMETER_MODIFIER_VALUE_PER_RANK);
    }
};