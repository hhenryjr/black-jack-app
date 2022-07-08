import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Card } from '../cards/cards';
import { ICard } from '../cards/cards.interface';
import { CardsService } from '../cards/cards.service';
import { Hand } from '../hand/hand';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnChanges {
  hand: Hand = new Hand();
  @Input() hands: Hand[] = [new Hand()];
  showDealButton: boolean = true;
  // @Input() card: ICard = new Card();
  @Output() change: EventEmitter<ICard> = new EventEmitter<ICard>();
  constructor(private cardsService: CardsService) { }

  // ngOnInit(): void {
    
  // }

  ngOnChanges(): void {
    if (this.hands.length > 0){
      console.log("Player has at least one hand!");
      if (this.hands[0].cards.length > 0){
        console.log("Player has at least one card");
      }
    }
    // if (this.card.id > 0) {
    //   var card = this.card;
    //   this.hand.cards.push(card);
    //   this.hand.calculate();
    //   if(this.hand.cards.length >= 2){
    //     console.log("Ready to play!!");
    //   }
    //   else{
    //     this.change.emit(card);
    //   }
    // }
  }


  hit() {
    var card = this.cardsService.draw();
    this.hand.cards.push(card);
  }

}
