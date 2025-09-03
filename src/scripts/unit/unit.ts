import { RankLetter, ParameterRankLetter } from "../attributes/rank/rankLetter";
import { ParameterType } from "../../constants/parameterType";
import { UnitRankedAttributes } from "./unitRankedAttributes";
import { ExpertiseSkillType, MartialSkillType } from "../../constants/skillType";
import { PARAMETER_MODIFIER_VALUE_PER_RANK, SKILL_MODIFIER_VALUE_PER_RANK } from "../../constants/modifierValuesPerRank";

export interface UnitProps {
    unitParameterProps: UnitParameterRankProps;
    unitSkillProps: UnitSkillsRankProps;
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


export class Unit {
    name: string;
    parameters: UnitRankedAttributes;
    expertiseSkills: UnitRankedAttributes;
    martialSkills: UnitRankedAttributes;

    constructor(name: string, unitProps: UnitProps) {
        this.name = name;
        unitProps.unitParameterProps
        this.parameters = UnitRankedAttributes.initializeRankedAttributesFromRankLetterRecord(unitProps.unitParameterProps, PARAMETER_MODIFIER_VALUE_PER_RANK);
        this.expertiseSkills = UnitRankedAttributes.initializeRankedAttributesFromRankLetterRecord(unitProps.unitSkillProps.unitExpertiseSkillsProps, SKILL_MODIFIER_VALUE_PER_RANK);
        this.martialSkills = UnitRankedAttributes.initializeRankedAttributesFromRankLetterRecord(unitProps.unitSkillProps.unitMartialSkillsProps, SKILL_MODIFIER_VALUE_PER_RANK);
    }


};