import { RankLetter, ParameterRankLetter } from "../attributes/rank/rankLetter";

export interface UnitProps {
    unitParameterProps: UnitParameterRankProps;
    unitSkillProps: UnitSkillsRankProps;
}

interface UnitParameterRankProps {
    strRank: ParameterRankLetter;
    endRank: ParameterRankLetter;
    aglRank: ParameterRankLetter;
    magRank: ParameterRankLetter;
    lukRank: ParameterRankLetter;
}

interface UnitSkillsRankProps {
    unitExpertiseSkillsProps: UnitExpertiseSkillsProps,
    unitMartialSkillsProps: UnitMartialSkillsProps

}

interface UnitExpertiseSkillsProps {
    academiaRank: RankLetter,
    stealthRank: RankLetter,
    technologyRank: RankLetter,
    survivalRank: RankLetter,
    ridingRank: RankLetter
}

interface UnitMartialSkillsProps {
    handToHandRank: RankLetter,
    weaponMasteryRank: RankLetter,
    marksmanshipRank: RankLetter
}


export class Unit {
    name: string;
    parameterRanks: UnitRankedParameters;
    expertiseSkillsRanks: UnitRankedExpertiseSkills;
    martialSkillsRanks: UnitRankedMartialSkills;


    constructor(name: string, unitProps: UnitProps) {
        this.name = name;
        this.parameterRanks = this.initializeParameters(unitProps.unitParameterProps);
        this.expertiseSkillsRanks = this.initializeExperetiseSkills(unitProps.unitSkillProps.unitExpertiseSkillsProps);
        this.martialSkillsRanks = this.initializeMartialSkills(unitProps.unitSkillProps.unitMartialSkillsProps);
    }

    getCheckBonus(parameterType: ParameterType): number {
        const parameterCheckBonus = this.parameterRanks.rankedAbilityScores[parameterType].getBonus();
        return parameterCheckBonus;
    }
};