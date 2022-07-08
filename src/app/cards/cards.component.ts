import { Component, OnInit } from '@angular/core';
import { Card } from './cards';
import { ICard } from './cards.interface';
import { CardsService } from './cards.service';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor(private cardsService: CardsService) { }

  drawnCard: ICard = new Card();

  ngOnInit(): void {
    // this.shuffledDeck = this.deck;
    // this.deck = this.shuffledDeck.slice(0);
  }

  draw(): void {
    this.drawnCard = this.cardsService.draw();
    // this.drawnCard = this.deck[Math.floor(Math.random() * this.deck.length)];
    // var index = this.deck.indexOf(this.drawnCard);
    // if (index > -1) this.deck.splice(index, 1);
    // if (this.deck.length < 5) this.shuffle();
    // return this.drawnCard;
  }

  // shuffle(): void {
  //   this.deck = this.shuffledDeck.slice(0);
  // }
}
