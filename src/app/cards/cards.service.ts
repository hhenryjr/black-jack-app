import { Injectable } from '@angular/core';
import { Card } from './cards';
import { ICard } from './cards.interface';

@Injectable({
    providedIn: 'root'
})
export class CardsService {
    deck: ICard[] = [
        {
            id: 1,
            name: "A",
            value: 11,
            isHidden: false,
            suit: "&#9824;",
            color: "black"
        },
        {
            id: 2,
            name: "A",
            value: 11,
            isHidden: false,
            suit: "&#9827;",
            color: "black"
        },
        {
            id: 3,
            name: "A",
            value: 11,
            isHidden: false,
            suit: "&#9829;",
            color: "red"
        },
        {
            id: 4,
            name: "A",
            value: 11,
            isHidden: false,
            suit: "&#9830;",
            color: "red"
        },
        {
            id: 5,
            name: "2",
            value: 2,
            isHidden: false,
            suit: "&#9824;",
            color: "black"
        },
        {
            id: 6,
            name: "2",
            value: 2,
            isHidden: false,
            suit: "&#9827;",
            color: "black"
        },
        {
            id: 7,
            name: "2",
            value: 2,
            isHidden: false,
            suit: "&#9829;",
            color: "red"
        },
        {
            id: 8,
            name: "2",
            value: 2,
            isHidden: false,
            suit: "&#9830;",
            color: "red"
        },
        {
            id: 9,
            name: "3",
            value: 3,
            isHidden: false,
            suit: "&#9824;",
            color: "black"
        },
        {
            id: 10,
            name: "3",
            value: 3,
            isHidden: false,
            suit: "&#9827;",
            color: "black"
        },
        {
            id: 11,
            name: "3",
            value: 3,
            isHidden: false,
            suit: "&#9829;",
            color: "red"
        },
        {
            id: 12,
            name: "3",
            value: 3,
            isHidden: false,
            suit: "&#9830;",
            color: "red"
        },
        {
            id: 13,
            name: "4",
            value: 4,
            isHidden: false,
            suit: "&#9824;",
            color: "black"
        },
        {
            id: 14,
            name: "4",
            value: 4,
            isHidden: false,
            suit: "&#9827;",
            color: "black"
        },
        {
            id: 15,
            name: "4",
            value: 4,
            isHidden: false,
            suit: "&#9829;",
            color: "red"
        },
        {
            id: 16,
            name: "4",
            value: 4,
            isHidden: false,
            suit: "&#9830;",
            color: "red"
        },
        {
            id: 17,
            name: "5",
            value: 5,
            isHidden: false,
            suit: "&#9824;",
            color: "black"
        },
        {
            id: 18,
            name: "5",
            value: 5,
            isHidden: false,
            suit: "&#9827;",
            color: "black"
        },
        {
            id: 19,
            name: "5",
            value: 5,
            isHidden: false,
            suit: "&#9829;",
            color: "red"
        },
        {
            id: 20,
            name: "5",
            value: 5,
            isHidden: false,
            suit: "&#9830;",
            color: "red"
        },
        {
            id: 21,
            name: "6",
            value: 6,
            isHidden: false,
            suit: "&#9824;",
            color: "black"
        },
        {
            id: 22,
            name: "6",
            value: 6,
            isHidden: false,
            suit: "&#9827;",
            color: "black"
        },
        {
            id: 23,
            name: "6",
            value: 6,
            isHidden: false,
            suit: "&#9829;",
            color: "red"
        },
        {
            id: 24,
            name: "6",
            value: 6,
            isHidden: false,
            suit: "&#9830;",
            color: "red"
        },
        {
            id: 25,
            name: "7",
            value: 7,
            isHidden: false,
            suit: "&#9824;",
            color: "black"
        },
        {
            id: 26,
            name: "7",
            value: 7,
            isHidden: false,
            suit: "&#9827;",
            color: "black"
        },
        {
            id: 27,
            name: "7",
            value: 7,
            isHidden: false,
            suit: "&#9829;",
            color: "red"
        },
        {
            id: 28,
            name: "7",
            value: 7,
            isHidden: false,
            suit: "&#9830;",
            color: "red"
        },
        {
            id: 29,
            name: "8",
            value: 8,
            isHidden: false,
            suit: "&#9824;",
            color: "black"
        },
        {
            id: 30,
            name: "8",
            value: 8,
            isHidden: false,
            suit: "&#9827;",
            color: "black"
        },
        {
            id: 31,
            name: "8",
            value: 8,
            isHidden: false,
            suit: "&#9829;",
            color: "red"
        },
        {
            id: 32,
            name: "8",
            value: 8,
            isHidden: false,
            suit: "&#9830;",
            color: "red"
        },
        {
            id: 33,
            name: "9",
            value: 9,
            isHidden: false,
            suit: "&#9824;",
            color: "black"
        },
        {
            id: 34,
            name: "9",
            value: 9,
            isHidden: false,
            suit: "&#9827;",
            color: "black"
        },
        {
            id: 35,
            name: "9",
            value: 9,
            isHidden: false,
            suit: "&#9829;",
            color: "red"
        },
        {
            id: 36,
            name: "9",
            value: 9,
            isHidden: false,
            suit: "&#9830;",
            color: "red"
        },
        {
            id: 37,
            name: "10",
            value: 10,
            isHidden: false,
            suit: "&#9824;",
            color: "black"
        },
        {
            id: 38,
            name: "10",
            value: 10,
            isHidden: false,
            suit: "&#9827;",
            color: "black"
        },
        {
            id: 39,
            name: "10",
            value: 10,
            isHidden: false,
            suit: "&#9829;",
            color: "red"
        },
        {
            id: 40,
            name: "10",
            value: 10,
            isHidden: false,
            suit: "&#9830;",
            color: "red"
        },
        {
            id: 41,
            name: "J",
            value: 10,
            isHidden: false,
            suit: "&#9824;",
            color: "black"
        },
        {
            id: 42,
            name: "J",
            value: 10,
            isHidden: false,
            suit: "&#9827;",
            color: "black"
        },
        {
            id: 43,
            name: "J",
            value: 10,
            isHidden: false,
            suit: "&#9829;",
            color: "red"
        },
        {
            id: 44,
            name: "J",
            value: 10,
            isHidden: false,
            suit: "&#9830;",
            color: "red"
        },
        {
            id: 45,
            name: "Q",
            value: 10,
            isHidden: false,
            suit: "&#9824;",
            color: "black"
        },
        {
            id: 46,
            name: "Q",
            value: 10,
            isHidden: false,
            suit: "&#9827;",
            color: "black"
        },
        {
            id: 47,
            name: "Q",
            value: 10,
            isHidden: false,
            suit: "&#9829;",
            color: "red"
        },
        {
            id: 48,
            name: "Q",
            value: 10,
            isHidden: false,
            suit: "&#9830;",
            color: "red"
        },
        {
            id: 49,
            name: "K",
            value: 10,
            isHidden: false,
            suit: "&#9824;",
            color: "black"
        },
        {
            id: 50,
            name: "K",
            value: 10,
            isHidden: false,
            suit: "&#9827;",
            color: "black"
        },
        {
            id: 51,
            name: "K",
            value: 10,
            isHidden: false,
            suit: "&#9829;",
            color: "red"
        },
        {
            id: 52,
            name: "K",
            value: 10,
            isHidden: false,
            suit: "&#9830;",
            color: "red"
        }
    ];
    drawnCard: Card = new Card();
    shuffledDeck: ICard[];
    numberOfDecks: number = 1;

    constructor() {
        this.shuffledDeck = this.deck;
        this.deck = this.shuffledDeck.slice(0);
    }

    draw(): ICard {
        this.drawnCard = this.deck[Math.floor(Math.random() * this.deck.length)];
        var index = this.deck.indexOf(this.drawnCard);
        if (index > -1) this.deck.splice(index, 1);
        if (this.deck.length < 5) this.shuffle();
        return this.drawnCard;
    }

    shuffle(): void {
        this.deck = this.shuffledDeck.slice(0);
        //this.deck = this.deck.concat(this.shuffledDeck.slice(0));
        // var i = 0;
        // while (i < this.numberOfDecks) {
        //     if (i = 0) this.deck = this.shuffledDeck.slice(0);
        //     else this.deck = this.deck.concat(this.shuffledDeck.slice(0));
        //     i++;
        // }
        // for (var i = 0; i < this.numberOfDecks - 1; i++) {
        //     if (i = 0) this.deck = this.shuffledDeck.slice(0);
        //     else this.deck = this.deck.concat(this.shuffledDeck.slice(0));
        // }
    }

    setDeckNumber(decks: number): void {
        this.numberOfDecks = decks;
    }
}