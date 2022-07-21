import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from './cards/cards';
import { ICard } from './cards/cards.interface';
import { CardsService } from './cards/cards.service';
import { Hand } from './hand/hand';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component2.css']
})
export class AppComponent {
  title = 'Black Jack 21';
  playerCard: ICard = new Card();
  dealerHand: Hand = new Hand();
  playerHands: Hand[] = [new Hand()];
  init: number = 2
  handCounter: number = 0;
  showDealButton: boolean = true;
  showHitButton: boolean = false;
  showStandButton: boolean = false;
  showDoubleButton: boolean = false;
  showSplitButton: boolean = false;
  isSubtractingTen: boolean = true;
  playerWins: number = 0;
  playerLosses: number = 0;
  playerPushes: number = 0;

  constructor(private cardsService: CardsService, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.clearTable();
  }

  deckForm = new FormGroup({
    numberOfDecks: new FormControl(1),
  });

  clearTable() {
    this.playerHands = [new Hand()];
    this.playerHands[this.handCounter].cards = [];
    this.dealerHand = new Hand();
    // var numberOfDecks = this.deckForm.value;
    // this.cardsService.setDeckNumber(numberOfDecks);
  }

  deal() {
    this.clearTable();
    this.showDealButton = false;
    this.playerHands[this.handCounter].cards.push(this.cardsService.draw());
    this.playerHands[this.handCounter].calculate();
    setTimeout(() => {
      var dealerCard = this.cardsService.draw();
      dealerCard.isHidden = true;
      this.dealerHand.cards.push(dealerCard);
    }, 500)
    setTimeout(() => {
      this.playerHands[this.handCounter].cards.push(this.cardsService.draw());
      this.playerHands[this.handCounter].calculate();
      if (this.playerHands[this.handCounter].total > 21) this.playerHands[this.handCounter].total -= 10;
    }, 1000)
    setTimeout(() => {
      this.dealerHand.cards.push(this.cardsService.draw());
      this.dealerHand.calculate();
      this.checkHands();
    }, 1500)
  }

  checkHands() {
    this.showDoubleButton = true;
    this.showHitButton = true;
    this.showStandButton = true;
    if (this.dealerHand.total + this.dealerHand.cards[0].value == 21 &&
      this.dealerHand.total + this.dealerHand.cards[0].value == this.playerHands[this.handCounter].total) {
      this.dealerHand.cards[0].isHidden = false;
      this.dealerHand.calculate();
      this.showDoubleButton = false;
      this.showSplitButton = false;
      this.showHitButton = false;
      this.showStandButton = false;
      setTimeout(() => {
        alert("PUSH!");
        this.playerPushes++;
        this.reset();
      }, 500);
    }
    else if (this.dealerHand.total + this.dealerHand.cards[0].value == 21 &&
      this.dealerHand.total + this.dealerHand.cards[0].value > this.playerHands[this.handCounter].total) {
      this.dealerHand.cards[0].isHidden = false;
      this.dealerHand.calculate();
      setTimeout(() => {
        this.showDoubleButton = false;
        this.showSplitButton = false;
        this.showHitButton = false;
        this.showStandButton = false;
        alert("BLACK JACK! Dealer wins!");
        this.playerLosses++;
        this.reset();
      }, 500);
    }
    else if (this.playerHands[this.handCounter].total == 21) {
      setTimeout(() => {
        this.showDoubleButton = false;
        this.showSplitButton = false;
        this.showHitButton = false;
        this.showStandButton = false;
        alert("BLACK JACK! You win!");
        this.playerWins++;
        this.dealerHand.cards[0].isHidden = false;
        this.dealerHand.calculate();
        this.reset();
      }, 500);
    }
    if (this.playerHands[this.handCounter].cards[0].value === this.playerHands[this.handCounter].cards[1].value)
      this.showSplitButton = true;
  }

  hit() {
    // Draws card and calculates hand
    this.drawCard();

    // If player has multiple hands from splitting
    if (this.playerHands.length > 1) {
      this.showDoubleButton = false;
      this.showSplitButton = false;
      if (this.playerHands[this.handCounter].total > 21) {
        setTimeout(() => {
          alert("BUST!");
          if (this.handCounter < this.playerHands.length) this.handCounter++;
          this.checkSplitHand();
        }, 500);
      }
      else if (this.playerHands[this.handCounter].total == 21) this.stand();
      else if (this.playerHands[this.handCounter].cards.length == 2) this.showDoubleButton = true;
    }

    // If player has only one hand
    else {
      this.showDoubleButton = false;
      this.showSplitButton = false;
      if (this.playerHands[this.handCounter].total > 21) this.bust();
      if (this.playerHands[this.handCounter].total == 21) this.stand();
    }
  }

  stand() {
    this.showHitButton = false;
    this.showStandButton = false;
    this.showDoubleButton = false;
    this.showSplitButton = false;
    this.isSubtractingTen = true;
    setTimeout(() => {
      // If player has multiple hands from splitting
      if (this.playerHands.length > 1) {
        if (this.handCounter < this.playerHands.length &&
          this.playerHands[this.handCounter].cards[0].name === "A" &&
          this.playerHands[1].cards[0].name === "A") {
          this.dealerHand.cards[0].isHidden = false;
          this.dealerHand.calculate();
          var aces = this.dealerHand.cards.filter(x => x.name === "A");
          if (aces.length == 2) this.dealerHand.total -= 10;
          this.playerHands.forEach(playerHand => {
            this.compare(playerHand);
          });
        }
        else if (this.handCounter < this.playerHands.length - 1) {
          this.handCounter++;
          this.checkSplitHand();
        }
        else {
          var i = 0;
          this.dealerHand.cards[0].isHidden = false;
          this.dealerHand.calculate();
          var aces = this.dealerHand.cards.filter(x => x.name === "A");
          if (aces.length == 2) this.dealerHand.total -= 10;
          setTimeout(() => {
            while (i < this.playerHands.length) {
              this.compare(this.playerHands[i]);
              i++;
            }
            this.reset();
          }, 500);
        }
      }

      // If player has only one hand
      else {
        this.dealerHand.cards[0].isHidden = false;
        this.dealerHand.calculate();
        var aces = this.dealerHand.cards.filter(x => x.name === "A");
        if (aces.length == 2) this.dealerHand.total -= 10;
        setTimeout(() => {
          this.compare(this.playerHands[this.handCounter]);
        }, 500);
      }
    }, 500);
  }

  doubleDown() {
    this.showDoubleButton = false;
    this.showSplitButton = false;
    this.showHitButton = false;
    this.showStandButton = false;
    var card = this.cardsService.draw();
    this.playerHands[this.handCounter].cards.push(card);
    this.playerHands[this.handCounter].calculate();
    var aces = this.playerHands[this.handCounter].cards.filter(x => x.name === "A");
    if (this.playerHands[this.handCounter].total > 21 && (card.name === "A" || aces && aces.length > 0))
      this.playerHands[this.handCounter].total -= 10;
    if (this.playerHands[this.handCounter].total <= 21) this.stand();
    else if (this.handCounter < this.playerHands.length) {
      setTimeout(() => {
        alert("BUST!");
        if (this.handCounter < this.playerHands.length) this.handCounter++;
        this.checkSplitHand();
      }, 500);
    }
    else this.bust();
  }

  split() {
    this.showSplitButton = false;
    var splitHand = new Hand();
    var splitCard = this.playerHands[this.handCounter].cards.pop() || new Card();
    if (splitCard.id > 0) {
      splitHand.cards.push(splitCard);
      this.playerHands.push(splitHand);
      this.playerHands.forEach(playerHand => {
        playerHand.calculate();
      });
      setTimeout(() => {
        this.checkSplitHand();
      }, 500);
    }
    else {
      alert("ERROR! - Missing split card.");
      this.reset();
    }
  }

  checkSplitHand() {
    if (this.handCounter < this.playerHands.length) {
      if (this.playerHands[this.handCounter].cards[0].name === "A" &&
        this.playerHands[this.handCounter + 1].cards[0].name === "A") {
        this.showHitButton = false;
        this.showStandButton = false;
        this.showDoubleButton = false;
        this.showSplitButton = false;
        var index = 0;
        this.playerHands.forEach(playerHand => {
          index = this.playerHands.indexOf(playerHand);
          setTimeout(() => {
            playerHand.cards.push(this.cardsService.draw());
            playerHand.calculate();
          }, 500 * (index + 1));
        });
        setTimeout(() => {
          this.stand();
        }, 500 * (index + 1));
      }
      else {
        this.playerHands[this.handCounter].cards.push(this.cardsService.draw());
        this.playerHands[this.handCounter].calculate();
        if (this.playerHands[this.handCounter].cards[0].value +
          this.playerHands[this.handCounter].cards[1].value == 21)
          this.stand();
        if (this.playerHands[this.handCounter].cards[0].value ===
          this.playerHands[this.handCounter].cards[1].value)
          this.showSplitButton = true;
        else this.showSplitButton = false;
        this.showHitButton = true;
        this.showStandButton = true;
        this.showDoubleButton = true;
      }
    }
    else {
      setTimeout(() => {
        this.stand();
      }, 500);
    }
  }

  bust() {
    setTimeout(() => {
      alert("BUST! Player loses.");
      this.playerLosses++;
      this.reset();
      this.dealerHand.cards[0].isHidden = false;
      this.dealerHand.calculate();
      var aces = this.dealerHand.cards.filter(x => x.name === "A");
      if (aces.length == 2) this.dealerHand.total -= 10;
    }, 500);
  }

  reset() {
    setTimeout(() => {
      this.showDealButton = true;
      this.showHitButton = false;
      this.showStandButton = false;
      this.showDoubleButton = false;
      this.showSplitButton = false;
      this.isSubtractingTen = true;
      this.handCounter = 0;
    }, 500);
  }

  drawCard() {
    var card = this.cardsService.draw();
    if (this.playerHands[this.handCounter].total + card.value > 21) {
      var aces = this.playerHands[this.handCounter].cards.filter(x => x.name === "A");
      if (card.name === "A") {
        if (aces && aces.length > 0 && this.playerHands[this.handCounter].cards.length < 3 &&
          this.playerHands[this.handCounter].total > 10) {
          this.playerHands[this.handCounter].total -= 10;
        }
        else if (this.playerHands[this.handCounter].total > 10) {
          this.playerHands[this.handCounter].total -= 10;
          this.isSubtractingTen = false;
        }
        else this.playerHands[this.handCounter].total -= 10;
      }
      else if (aces && aces.length > 0 && this.isSubtractingTen) {
        this.playerHands[this.handCounter].total -= 10;
        this.isSubtractingTen = false;
      }
    }
    this.playerHands[this.handCounter].cards.push(card);
    this.playerHands[this.handCounter].total += card.value;
  }

  compare(playerHand: Hand) {
    var aces = this.dealerHand.cards.filter(x => x.name === "A");
    var bustedHands = this.playerHands.filter(x => x.total > 21).length;

    // Dealer must hit on soft 17
    if ((this.dealerHand.total < 17 || (this.dealerHand.total == 17 && aces && aces.length > 0 && this.isSubtractingTen)) &&
      bustedHands !== this.playerHands.length) {
      var card = this.cardsService.draw();
      if (this.dealerHand.total + card.value > 21) {
        if (card.name === "A") {
          if (aces && aces.length > 0 && this.dealerHand.cards.length < 3 &&
            this.dealerHand.total > 10) {
            this.dealerHand.total -= 10;
          }
          else if (this.dealerHand.total > 10) {
            this.dealerHand.total -= 10;
            this.isSubtractingTen = false;
          }
          else this.dealerHand.total -= 10;
        }
        else if (aces && aces.length > 0 && this.isSubtractingTen) {
          this.dealerHand.total -= 10;
          this.isSubtractingTen = false;
        }
      }
      this.dealerHand.cards.push(card);
      this.dealerHand.total += card.value;
      setTimeout(() => {
        this.compare(playerHand);
      }, 500);
    }
    else {
      setTimeout(() => {
        if ((this.dealerHand.total > playerHand.total && this.dealerHand.total <= 21) || playerHand.total > 21) {
          alert("Dealer wins!");
          this.playerLosses++;
        }
        else if (this.dealerHand.total < playerHand.total ||
          (this.dealerHand.total > playerHand.total && this.dealerHand.total > 21)) {
          alert("Player wins!");
          this.playerWins++;
        }
        else {
          alert("PUSH!");
          this.playerPushes++;
        };
        this.reset();
      }, 500);
    }
  }
}
