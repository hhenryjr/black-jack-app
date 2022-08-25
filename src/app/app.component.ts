import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from './cards/cards';
import { ICard } from './cards/cards.interface';
import { CardsService } from './cards/cards.service';
import { Hand } from './hand/hand';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CheatSheetModalComponent } from './cheat-sheet-modal/cheat-sheet-modal.component';
import { SideBetModalComponent } from './side-bet-modal/side-bet-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component2.css']
})
export class AppComponent {
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
  showSurrenderButton: boolean = false;
  isSubtractingTen: boolean = true;
  playerWins: number = 0;
  playerLosses: number = 0;
  playerPushes: number = 0;
  betAmount: number = 0;
  bankAmount: number = 500;
  isInsured: boolean = false;
  insuranceAmount: number = 0;
  busterBetAmount: number = 0;
  fortuneBetAmount: number = 0;
  aupairBetAmount: number = 0;
  numberOfSideBets: number = 0;

  constructor(private cardsService: CardsService, public formBuilder: FormBuilder, public matDialog: MatDialog) { }

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

  addMoney(amount: number) {
    if (amount == 500) {
      if (this.betAmount > 0) this.bankAmount += this.betAmount;
      if (this.bankAmount >= amount) {
        this.betAmount = amount;
        this.bankAmount -= amount;
      }
      else {
        this.betAmount = this.bankAmount;
        this.bankAmount -= this.bankAmount;
      }
    }
    else if (this.betAmount + amount > 500) alert("You have reached the maximum bet!");
    else if (this.bankAmount >= amount) {
      this.betAmount += amount;
      this.bankAmount -= amount;
    }
    else if (this.bankAmount < amount) alert("You don't have enough money!");
  }

  removeMoney() {
    this.bankAmount += this.betAmount;
    this.betAmount = 0;
  }

  deal() {
    this.clearTable();
    this.showDealButton = false;
    this.playerHands[this.handCounter].betAmount = this.betAmount;
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
      setTimeout(() => {
        this.checkHands();
      }, 500);
    }, 1500)
  }

  checkHands() {
    this.showDoubleButton = true;
    this.showHitButton = true;
    this.showStandButton = true;
    this.showSurrenderButton = true;
    this.insuranceAmount = 0;

    // Checks for Fortune Black Jack bet
    if (this.fortuneBetAmount > 0) this.checkFortune();

    // Offers insurance if dealer shows an Ace
    if (this.dealerHand.cards[1].name === "A") this.checkInsurance();

    // Both player and dealer have black jack
    if (this.dealerHand.total + this.dealerHand.cards[0].value == 21 &&
      this.dealerHand.total + this.dealerHand.cards[0].value == this.playerHands[this.handCounter].total) {
      this.dealerHand.cards[0].isHidden = false;
      this.dealerHand.calculate();
      this.showDoubleButton = false;
      this.showSplitButton = false;
      this.showHitButton = false;
      this.showStandButton = false;
      this.showSurrenderButton = false;
      setTimeout(() => {
        if (!this.isInsured) {
          alert("PUSH!");
          this.bankAmount += this.betAmount;
          this.playerHands[this.handCounter].betAmount = 0;
          this.playerPushes++;

          // Checks for Buster Black Jack bet
          if (this.busterBetAmount > 0) this.checkBuster();
        }
        this.reset();
      }, 500);
    }

    // Dealer wins black jack
    else if (this.dealerHand.total + this.dealerHand.cards[0].value == 21 &&
      this.dealerHand.total + this.dealerHand.cards[0].value > this.playerHands[this.handCounter].total) {
      this.dealerHand.cards[0].isHidden = false;
      this.dealerHand.calculate();
      setTimeout(() => {
        this.showDoubleButton = false;
        this.showSplitButton = false;
        this.showHitButton = false;
        this.showStandButton = false;
        this.showSurrenderButton = false;
        alert("BLACKJACK! Dealer wins!");
        if (this.isInsured) this.bankAmount += (this.insuranceAmount * 2);
        this.playerHands[this.handCounter].betAmount = 0;
        if (!this.isInsured) this.playerLosses++;

        // Checks for Buster Black Jack bet
        if (this.busterBetAmount > 0) this.checkBuster();
        this.reset();
      }, 500);
    }

    // Player wins black jack
    else if (this.playerHands[this.handCounter].total == 21) {
      setTimeout(() => {
        this.showDoubleButton = false;
        this.showSplitButton = false;
        this.showHitButton = false;
        this.showStandButton = false;
        this.showSurrenderButton = false;
        if (!this.isInsured) {
          alert("BLACKJACK! You win!");
          this.bankAmount += (this.playerHands[this.handCounter].betAmount + (this.playerHands[this.handCounter].betAmount * 1.5));

          // Checks for Au Pair Black Jack bet
          if (this.aupairBetAmount > 0) this.checkAuPair();

          this.playerHands[this.handCounter].betAmount = 0;
          this.playerWins++;
        }
        this.dealerHand.cards[0].isHidden = false;
        this.dealerHand.calculate();

        // Checks for Buster Black Jack bet
        if (this.busterBetAmount > 0) this.stand();
        else this.reset();
      }, 500);
    }
    else if (this.isInsured) {
      alert("Dealer does not have blackjack!");
      this.playerHands[this.handCounter].betAmount -= this.insuranceAmount;
    }

    // Checks for Au Pair Black Jack bet
    if (this.aupairBetAmount > 0) this.checkAuPair();

    if (this.playerHands[this.handCounter].cards[0].value === this.playerHands[this.handCounter].cards[1].value)
      this.showSplitButton = true;
  }

  hit() {
    this.showDoubleButton = false;
    this.showSplitButton = false;
    this.showSurrenderButton = false;

    // Draws card and calculates hand
    this.drawCard();

    // If player has multiple hands from splitting
    if (this.playerHands.length > 1) {
      if (this.playerHands[this.handCounter].total > 21) {
        setTimeout(() => {
          alert("BUST!");
          this.playerHands[this.handCounter].betAmount = 0;
          this.betAmount = 0;
          if (this.handCounter < this.playerHands.length) this.handCounter++;
          this.checkSplitHand();
        }, 500);
      }
      else if (this.playerHands[this.handCounter].total == 21) this.stand();
      else if (this.playerHands[this.handCounter].cards.length == 2) this.showDoubleButton = true;
    }

    // If player has only one hand
    else {
      if (this.playerHands[this.handCounter].total > 21) this.bust();
      if (this.playerHands[this.handCounter].total == 21) this.stand();
    }
  }

  stand() {
    this.showHitButton = false;
    this.showStandButton = false;
    this.showDoubleButton = false;
    this.showSplitButton = false;
    this.showSurrenderButton = false;
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
    if (this.bankAmount >= this.playerHands[this.handCounter].betAmount) {
      this.showDoubleButton = false;
      this.showSplitButton = false;
      this.showHitButton = false;
      this.showStandButton = false;
      this.showSurrenderButton = false;
      var card = this.cardsService.draw();
      this.bankAmount -= this.playerHands[this.handCounter].betAmount;
      this.playerHands[this.handCounter].betAmount *= 2;
      this.playerHands[this.handCounter].cards.push(card);
      this.playerHands[this.handCounter].calculate();
      var aces = this.playerHands[this.handCounter].cards.filter(x => x.name === "A");
      if (this.playerHands[this.handCounter].total > 21 && (card.name === "A" || aces && aces.length > 0))
        this.playerHands[this.handCounter].total -= 10;
      if (this.playerHands[this.handCounter].total <= 21) this.stand();
      else if (this.handCounter < this.playerHands.length) {
        setTimeout(() => {
          alert("BUST!");
          this.playerHands[this.handCounter].betAmount = 0;
          this.betAmount = 0;
          if (this.handCounter < this.playerHands.length) this.handCounter++;
          this.checkSplitHand();
        }, 500);
      }
      else this.bust();
    }
    else alert("You don't have enough money!");
  }

  split() {
    if (this.bankAmount >= this.playerHands[this.handCounter].betAmount) {
      this.showSplitButton = false;
      this.showSurrenderButton = false;
      var splitHand = new Hand();
      var splitCard = this.playerHands[this.handCounter].cards.pop() || new Card();
      if (splitCard.id > 0) {
        splitHand.cards.push(splitCard);
        splitHand.betAmount = this.playerHands[this.handCounter].betAmount;
        this.bankAmount -= this.playerHands[this.handCounter].betAmount;
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
    else alert("You don't have enough money!");
  }

  surrender() {
    if (confirm("Are you sure you want to surrender?")) {
      setTimeout(() => {
        this.showHitButton = false;
        this.showStandButton = false;
        this.showDoubleButton = false;
        this.showSplitButton = false;
        this.showSurrenderButton = false;
        this.playerHands[this.handCounter].betAmount /= 2;
        this.dealerHand.cards[0].isHidden = false;
        this.dealerHand.calculate();
        var aces = this.dealerHand.cards.filter(x => x.name === "A");
        if (aces.length == 2) this.dealerHand.total -= 10;
        setTimeout(() => {
          alert("You have surrendered!");
          this.playerLosses++;
          this.bankAmount += this.playerHands[this.handCounter].betAmount;

          // Checks for Buster Black Jack bet
          if (this.busterBetAmount > 0) this.stand();
          else this.reset();
        }, 500);
      }, 500);
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
      this.dealerHand.cards[0].isHidden = false;
      this.dealerHand.calculate();
      var aces = this.dealerHand.cards.filter(x => x.name === "A");
      if (aces.length == 2) this.dealerHand.total -= 10;
      this.playerHands[this.handCounter].betAmount = 0;
      this.betAmount = 0;
      this.playerLosses++;

      // Checks for Buster Black Jack bet
      if (this.busterBetAmount > 0) this.compare(this.playerHands[this.handCounter]);
      else this.reset();
    }, 500);
  }

  reset() {
    setTimeout(() => {
      this.showDealButton = true;
      this.showHitButton = false;
      this.showStandButton = false;
      this.showDoubleButton = false;
      this.showSplitButton = false;
      this.showSurrenderButton = false;
      this.isSubtractingTen = true;
      this.isInsured = false;
      this.handCounter = 0;
      this.betAmount = 0;
      this.aupairBetAmount = 0;
      this.busterBetAmount = 0;
      this.fortuneBetAmount = 0;
      this.numberOfSideBets = 0;
    }, 500);
    setTimeout(() => {
      if (this.bankAmount == 0) alert("You are out of money! Refresh to reup!");
    }, 1000);
  }

  drawCard() {
    var card = this.cardsService.draw();
    if (this.playerHands[this.handCounter].total + card.value > 21) {
      var aces = this.playerHands[this.handCounter].cards.filter(x => x.name === "A");
      if (card.name === "A") {
        if (aces && aces.length > 0)
          this.playerHands[this.handCounter].total -= 10;
        else if (this.playerHands[this.handCounter].total > 10) {
          this.playerHands[this.handCounter].total -= 10;
          this.isSubtractingTen = false;
        }
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
      (bustedHands !== this.playerHands.length || (this.busterBetAmount > 0 && this.dealerHand.total < 17))) {
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
          if (this.dealerHand.total <= 21) {
            alert("Dealer wins!");
            if (playerHand.total < 21) playerHand.betAmount = 0;
            this.playerLosses++;
          }
          // Checks for Buster Black Jack bet
          if (this.busterBetAmount > 0) this.checkBuster();
        }
        else if (this.dealerHand.total < playerHand.total || this.dealerHand.total > 21 ||
          (this.dealerHand.total > playerHand.total && this.dealerHand.total > 21)) {
          if (playerHand.total <= 21) {
            alert("Player wins!");
            this.bankAmount += (playerHand.betAmount * 2);
            playerHand.betAmount = 0;
            this.playerWins++;
          }

          // Checks for Buster Black Jack bet
          if (this.busterBetAmount > 0) this.checkBuster();
        }
        else {
          alert("PUSH!");
          this.playerPushes++;
          this.bankAmount += this.betAmount;
          playerHand.betAmount = 0;

          // Checks for Buster Black Jack bet
          if (this.busterBetAmount > 0) this.checkBuster();
        };
        this.reset();
      }, 500);
    }
  }

  /* SIDE BETS */
  checkInsurance() {
    this.isInsured = (this.playerHands[this.handCounter].total == 21) ?
      confirm("Do you want even money?") : confirm("Do you want insurance?");
    this.insuranceAmount = this.playerHands[this.handCounter].betAmount / 2;
    if (this.isInsured) {
      if (this.bankAmount >= this.insuranceAmount) {
        if (this.playerHands[this.handCounter].total == 21) {
          this.bankAmount += (this.playerHands[this.handCounter].betAmount * 2);
          this.playerHands[this.handCounter].betAmount = 0;
        }
        else {
          this.playerHands[this.handCounter].betAmount += this.insuranceAmount;
          this.bankAmount -= this.insuranceAmount;
        }
      }
      else alert("You don't have enough money!");
    }
  }

  checkFortune() {
    var sideBetCards: ICard[] = [];
    sideBetCards.push(...this.playerHands[this.handCounter].cards);
    sideBetCards.push(this.dealerHand.cards[1]);
    var cardValues = sideBetCards.map(card => card.value);
    var hasSix = cardValues.includes(6);
    var hasSeven = cardValues.includes(7);
    var hasEight = cardValues.includes(8);
    var numberOfSevens = cardValues.filter(card => card == 7);
    var cardSuits = sideBetCards.map(card => card.suit);
    var cardValueSum = cardValues.reduce((a, b) => a + b, 0);
    if (cardValueSum == 31) cardValueSum -= 10;
    var isSuited = true;
    for (var i = 1; i < cardSuits.length; i++) {
      if (cardSuits[0] === cardSuits[i]) continue;
      else {
        isSuited = false;
        break;
      }
    }

    if (hasSix && hasSeven && hasEight) {
      if (isSuited) this.fortuneBetAmount *= 100;
      else this.fortuneBetAmount *= 25;
      alert("You've won $" + this.fortuneBetAmount + " from Fortune Black Jack!");
      this.bankAmount += this.fortuneBetAmount;
    }
    else if (numberOfSevens.length == 3) {
      this.fortuneBetAmount *= 50;
      alert("You've won $" + this.fortuneBetAmount + " from Fortune Black Jack!");
      this.bankAmount += this.fortuneBetAmount;
    }
    else if (cardValueSum == 21) {
      if (isSuited) this.fortuneBetAmount *= 10;
      else this.fortuneBetAmount *= 5;
      alert("You've won $" + this.fortuneBetAmount + " from Fortune Black Jack!");
      this.bankAmount += this.fortuneBetAmount;
    }
    else if (cardValueSum == 20) {
      this.fortuneBetAmount *= 2;
      alert("You've won $" + this.fortuneBetAmount + " from Fortune Black Jack!");
      this.bankAmount += this.fortuneBetAmount;
    }
    else if (cardValueSum == 19) {
      this.fortuneBetAmount = this.fortuneBetAmount;
      alert("You've won $" + this.fortuneBetAmount + " from Fortune Black Jack!");
      this.bankAmount += this.fortuneBetAmount;
    }
    else {
      alert("You've lost $" + this.fortuneBetAmount + " from Fortune Black Jack!");
      this.bankAmount -= this.fortuneBetAmount;
    }
  }

  checkAuPair() {
    var sideBetCards: ICard[] = [];
    sideBetCards.push(...this.playerHands[this.handCounter].cards);
    sideBetCards.push(this.dealerHand.cards[1]);
    var cardSuits = sideBetCards.map(card => card.suit);
    var cardColors = sideBetCards.map(card => card.color);
    var cardSpades = cardSuits.filter(card => card == "spades");
    if (this.playerHands[this.handCounter].total != 21) {
      alert("You've lost $" + this.aupairBetAmount + " from Au Pair Black Jack!");
      this.bankAmount -= this.aupairBetAmount;
    }
    else if (cardSpades.length == 2) {
      this.aupairBetAmount *= 50;
      alert("You've won $" + this.aupairBetAmount + " from Au Pair Black Jack!");
      this.bankAmount += this.aupairBetAmount;
    }
    else if (cardSuits[0] === cardSuits[1]) {
      this.aupairBetAmount *= 25;
      alert("You've won $" + this.aupairBetAmount + " from Au Pair Black Jack!");
      this.bankAmount += this.aupairBetAmount;
    }
    else if (cardColors[0] === cardColors[1]) {
      this.aupairBetAmount *= 2;
      alert("You've won $" + this.aupairBetAmount + " from Au Pair Black Jack!");
      this.bankAmount += this.aupairBetAmount;
    }
    else {
      this.aupairBetAmount = this.aupairBetAmount;
      alert("You've won $" + this.aupairBetAmount + " from Au Pair Black Jack!");
      this.bankAmount += this.aupairBetAmount;
    }
  }

  checkBuster() {
    if (this.dealerHand.total > 21) {
      switch (this.dealerHand.cards.length) {
        case 3:
          this.busterBetAmount = this.busterBetAmount;
          break;
        case 4:
          this.busterBetAmount *= 2;
          break;
        case 5:
          this.busterBetAmount *= 10;
          break;
        case 6:
          this.busterBetAmount *= 20;
          break;
        case 7:
          this.busterBetAmount *= 100;
          break;
      }
      alert("You've won $" + this.busterBetAmount + " from Buster Black Jack!");
      this.bankAmount += this.busterBetAmount;
    }
    else {
      alert("You've lost $" + this.busterBetAmount + " from Buster Black Jack!");
      this.bankAmount -= this.busterBetAmount;
    }
  }

  /* MODALS */
  openCheatSheetModal() {
    this.matDialog.open(CheatSheetModalComponent);
  }

  openSideBetModal() {
    const dialogRef = this.matDialog.open(SideBetModalComponent);
    dialogRef.componentInstance.bankAmount = this.bankAmount;
    dialogRef.componentInstance.busterBetAmount = this.busterBetAmount;
    dialogRef.componentInstance.fortuneBetAmount = this.fortuneBetAmount;
    dialogRef.componentInstance.aupairBetAmount = this.aupairBetAmount;
    dialogRef.afterClosed().subscribe(result => {
      this.numberOfSideBets = 0;
      this.busterBetAmount = result.data.busterBetAmount;
      if (this.busterBetAmount > 0) this.numberOfSideBets++;
      this.fortuneBetAmount = result.data.fortuneBetAmount;
      if (this.fortuneBetAmount > 0) this.numberOfSideBets++;
      this.aupairBetAmount = result.data.aupairBetAmount;
      if (this.aupairBetAmount > 0) this.numberOfSideBets++;
    });
  }
}
