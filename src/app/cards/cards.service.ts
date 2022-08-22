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
            suit: "spades",
            color: "black",
            src: "../assets/cards/ace_of_spades.png"
        },
        {
            id: 2,
            name: "A",
            value: 11,
            isHidden: false,
            suit: "clubs",
            color: "black",
            src: "../assets/cards/ace_of_clubs.png"
        },
        {
            id: 3,
            name: "A",
            value: 11,
            isHidden: false,
            suit: "hearts",
            color: "red",
            src: "../assets/cards/ace_of_hearts.png"
        },
        {
            id: 4,
            name: "A",
            value: 11,
            isHidden: false,
            suit: "diamonds",
            color: "red",
            src: "../assets/cards/ace_of_diamonds.png"
        },
        {
            id: 5,
            name: "2",
            value: 2,
            isHidden: false,
            suit: "spades",
            color: "black",
            src: "../assets/cards/2_of_spades.png"
        },
        {
            id: 6,
            name: "2",
            value: 2,
            isHidden: false,
            suit: "clubs",
            color: "black",
            src: "../assets/cards/2_of_clubs.png"
        },
        {
            id: 7,
            name: "2",
            value: 2,
            isHidden: false,
            suit: "hearts",
            color: "red",
            src: "../assets/cards/2_of_hearts.png"
        },
        {
            id: 8,
            name: "2",
            value: 2,
            isHidden: false,
            suit: "diamonds",
            color: "red",
            src: "../assets/cards/2_of_diamonds.png"
        },
        {
            id: 9,
            name: "3",
            value: 3,
            isHidden: false,
            suit: "spades",
            color: "black",
            src: "../assets/cards/3_of_spades.png"
        },
        {
            id: 10,
            name: "3",
            value: 3,
            isHidden: false,
            suit: "clubs",
            color: "black",
            src: "../assets/cards/3_of_clubs.png"
        },
        {
            id: 11,
            name: "3",
            value: 3,
            isHidden: false,
            suit: "hearts",
            color: "red",
            src: "../assets/cards/3_of_hearts.png"
        },
        {
            id: 12,
            name: "3",
            value: 3,
            isHidden: false,
            suit: "diamonds",
            color: "red",
            src: "../assets/cards/3_of_diamonds.png"
        },
        {
            id: 13,
            name: "4",
            value: 4,
            isHidden: false,
            suit: "spades",
            color: "black",
            src: "../assets/cards/4_of_spades.png"
        },
        {
            id: 14,
            name: "4",
            value: 4,
            isHidden: false,
            suit: "clubs",
            color: "black",
            src: "../assets/cards/4_of_clubs.png"
        },
        {
            id: 15,
            name: "4",
            value: 4,
            isHidden: false,
            suit: "hearts",
            color: "red",
            src: "../assets/cards/4_of_hearts.png"
        },
        {
            id: 16,
            name: "4",
            value: 4,
            isHidden: false,
            suit: "diamonds",
            color: "red",
            src: "../assets/cards/4_of_diamonds.png"
        },
        {
            id: 17,
            name: "5",
            value: 5,
            isHidden: false,
            suit: "spades",
            color: "black",
            src: "../assets/cards/5_of_spades.png"
        },
        {
            id: 18,
            name: "5",
            value: 5,
            isHidden: false,
            suit: "clubs",
            color: "black",
            src: "../assets/cards/5_of_clubs.png"
        },
        {
            id: 19,
            name: "5",
            value: 5,
            isHidden: false,
            suit: "hearts",
            color: "red",
            src: "../assets/cards/5_of_hearts.png"
        },
        {
            id: 20,
            name: "5",
            value: 5,
            isHidden: false,
            suit: "diamonds",
            color: "red",
            src: "../assets/cards/5_of_diamonds.png"
        },
        {
            id: 21,
            name: "6",
            value: 6,
            isHidden: false,
            suit: "spades",
            color: "black",
            src: "../assets/cards/6_of_spades.png"
        },
        {
            id: 22,
            name: "6",
            value: 6,
            isHidden: false,
            suit: "clubs",
            color: "black",
            src: "../assets/cards/6_of_clubs.png"
        },
        {
            id: 23,
            name: "6",
            value: 6,
            isHidden: false,
            suit: "hearts",
            color: "red",
            src: "../assets/cards/6_of_hearts.png"
        },
        {
            id: 24,
            name: "6",
            value: 6,
            isHidden: false,
            suit: "diamonds",
            color: "red",
            src: "../assets/cards/6_of_diamonds.png"
        },
        {
            id: 25,
            name: "7",
            value: 7,
            isHidden: false,
            suit: "spades",
            color: "black",
            src: "../assets/cards/7_of_spades.png"
        },
        {
            id: 26,
            name: "7",
            value: 7,
            isHidden: false,
            suit: "clubs",
            color: "black",
            src: "../assets/cards/7_of_clubs.png"
        },
        {
            id: 27,
            name: "7",
            value: 7,
            isHidden: false,
            suit: "hearts",
            color: "red",
            src: "../assets/cards/7_of_hearts.png"
        },
        {
            id: 28,
            name: "7",
            value: 7,
            isHidden: false,
            suit: "diamonds",
            color: "red",
            src: "../assets/cards/7_of_diamonds.png"
        },
        {
            id: 29,
            name: "8",
            value: 8,
            isHidden: false,
            suit: "spades",
            color: "black",
            src: "../assets/cards/8_of_spades.png"
        },
        {
            id: 30,
            name: "8",
            value: 8,
            isHidden: false,
            suit: "clubs",
            color: "black",
            src: "../assets/cards/8_of_clubs.png"
        },
        {
            id: 31,
            name: "8",
            value: 8,
            isHidden: false,
            suit: "hearts",
            color: "red",
            src: "../assets/cards/8_of_hearts.png"
        },
        {
            id: 32,
            name: "8",
            value: 8,
            isHidden: false,
            suit: "diamonds",
            color: "red",
            src: "../assets/cards/8_of_diamonds.png"
        },
        {
            id: 33,
            name: "9",
            value: 9,
            isHidden: false,
            suit: "spades",
            color: "black",
            src: "../assets/cards/9_of_spades.png"
        },
        {
            id: 34,
            name: "9",
            value: 9,
            isHidden: false,
            suit: "clubs",
            color: "black",
            src: "../assets/cards/9_of_clubs.png"
        },
        {
            id: 35,
            name: "9",
            value: 9,
            isHidden: false,
            suit: "hearts",
            color: "red",
            src: "../assets/cards/9_of_hearts.png"
        },
        {
            id: 36,
            name: "9",
            value: 9,
            isHidden: false,
            suit: "diamonds",
            color: "red",
            src: "../assets/cards/9_of_diamonds.png"
        },
        {
            id: 37,
            name: "10",
            value: 10,
            isHidden: false,
            suit: "spades",
            color: "black",
            src: "../assets/cards/10_of_spades.png"
        },
        {
            id: 38,
            name: "10",
            value: 10,
            isHidden: false,
            suit: "clubs",
            color: "black",
            src: "../assets/cards/10_of_clubs.png"
        },
        {
            id: 39,
            name: "10",
            value: 10,
            isHidden: false,
            suit: "hearts",
            color: "red",
            src: "../assets/cards/10_of_hearts.png"
        },
        {
            id: 40,
            name: "10",
            value: 10,
            isHidden: false,
            suit: "diamonds",
            color: "red",
            src: "../assets/cards/10_of_diamonds.png"
        },
        {
            id: 41,
            name: "J",
            value: 10,
            isHidden: false,
            suit: "spades",
            color: "black",
            src: "../assets/cards/jack_of_spades.png"
        },
        {
            id: 42,
            name: "J",
            value: 10,
            isHidden: false,
            suit: "clubs",
            color: "black",
            src: "../assets/cards/jack_of_clubs.png"
        },
        {
            id: 43,
            name: "J",
            value: 10,
            isHidden: false,
            suit: "hearts",
            color: "red",
            src: "../assets/cards/jack_of_hearts.png"
        },
        {
            id: 44,
            name: "J",
            value: 10,
            isHidden: false,
            suit: "diamonds",
            color: "red",
            src: "../assets/cards/jack_of_diamonds.png"
        },
        {
            id: 45,
            name: "Q",
            value: 10,
            isHidden: false,
            suit: "spades",
            color: "black",
            src: "../assets/cards/queen_of_spades.png"
        },
        {
            id: 46,
            name: "Q",
            value: 10,
            isHidden: false,
            suit: "clubs",
            color: "black",
            src: "../assets/cards/queen_of_clubs.png"
        },
        {
            id: 47,
            name: "Q",
            value: 10,
            isHidden: false,
            suit: "hearts",
            color: "red",
            src: "../assets/cards/queen_of_hearts.png"
        },
        {
            id: 48,
            name: "Q",
            value: 10,
            isHidden: false,
            suit: "diamonds",
            color: "red",
            src: "../assets/cards/queen_of_diamonds.png"
        },
        {
            id: 49,
            name: "K",
            value: 10,
            isHidden: false,
            suit: "spades",
            color: "black",
            src: "../assets/cards/king_of_spades.png"
        },
        {
            id: 50,
            name: "K",
            value: 10,
            isHidden: false,
            suit: "clubs",
            color: "black",
            src: "../assets/cards/king_of_clubs.png"
        },
        {
            id: 51,
            name: "K",
            value: 10,
            isHidden: false,
            suit: "hearts",
            color: "red",
            src: "../assets/cards/king_of_hearts.png"
        },
        {
            id: 52,
            name: "K",
            value: 10,
            isHidden: false,
            suit: "diamonds",
            color: "red",
            src: "../assets/cards/king_of_diamonds.png"
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