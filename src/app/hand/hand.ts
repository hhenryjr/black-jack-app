import { ICard } from "../cards/cards.interface";

export class Hand {
    cards: ICard[] = [];
    total: number = 0;

    constructor() {}

    calculate(){
        this.total = this.cards.filter(x => !x.isHidden).map(x => x.value).reduce((a, b) => a + b, 0);
    }
}