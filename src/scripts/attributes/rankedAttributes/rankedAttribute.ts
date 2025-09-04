import { Rank } from "../rank/rank";
import { Stat } from "../stats/stat";


interface RankAttributeProps {
    rank: Rank;
    modifierValuePerRank: number;
    statsDerivedFromAttribute?: Record<string, Stat>
}

export class RankedAttribute {
    readonly rank: Rank;
    readonly modifierValuePerRank: number;
    readonly statsDerivedFromAttribute?: Record<string, Stat>;

    constructor(props: RankAttributeProps){
        this.rank = props.rank;
        this.modifierValuePerRank = props.modifierValuePerRank;
        this.statsDerivedFromAttribute = props.statsDerivedFromAttribute;
    }

    getModifier(): number {
        return this.rank.rankLetter * this.modifierValuePerRank;
    }

    rankUp(){
        this.rank.rankUp();
        this.updateDerivedStats();
       
    }

    rankDown(){
        this.rank.rankDown();
        this.updateDerivedStats();
    }

    private updateDerivedStats(){
         if(this.statsDerivedFromAttribute){
            Object.values(this.statsDerivedFromAttribute).forEach(stat =>{
                stat.updateStatValue()
            })
        }
    }
}