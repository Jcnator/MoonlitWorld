import { ParameterRankLetter, RankLetter } from "./rankLetter";

export class Rank {
    rankLetter: RankLetter | ParameterRankLetter;

    constructor(rankLetter: RankLetter){
        this.rankLetter = rankLetter;
    }

    rankUp(){
        if (typeof(this.rankLetter) === String(RankLetter)){
            this.rankLetter = Math.min(5, this.rankLetter + 1);
        }
        else{
            this.rankLetter = Math.min(10, this.rankLetter - 1);
        }
    }

    rankDown(){
        this.rankLetter = Math.max(0, this.rankLetter - 1);
    }
}