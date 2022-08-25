import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-side-bet-modal',
  templateUrl: './side-bet-modal.component.html',
  styleUrls: ['./side-bet-modal.component.css']
})
export class SideBetModalComponent implements OnInit {
  bankAmount: number = 0;
  busterBetAmount: number = 0;
  fortuneBetAmount: number = 0;
  aupairBetAmount: number = 0;
  sideBets: any = {};
  timeoutHandler: any;

  constructor(public dialogRef: MatDialogRef<SideBetModalComponent>) {
    this.busterBetAmount = -1;
  }

  ngOnInit(): void {
  }

  addSideBets() {
    if (this.busterBetAmount == 0 && this.fortuneBetAmount == 0 && this.aupairBetAmount == 0)
      alert("Please place a side bet!");
    else if (this.busterBetAmount + this.fortuneBetAmount + this.aupairBetAmount > this.bankAmount)
      alert("You don't have enough money!");
    else {
      let sideBets = {
        busterBetAmount: this.busterBetAmount,
        fortuneBetAmount: this.fortuneBetAmount,
        aupairBetAmount: this.aupairBetAmount
      }
      this.sideBets = sideBets;
      this.dialogRef.close({ event: 'close', data: sideBets });
    }
  }

  setBusterBet(amount: number) {
    this.busterBetAmount += amount;
  }

  setFortuneBet(amount: number) {
    this.fortuneBetAmount += amount;
  }

  setAuPairBet(amount: number) {
    this.aupairBetAmount += amount;
  }

  mouseup() {
    if (this.timeoutHandler) {
      clearInterval(this.timeoutHandler);
      this.busterBetAmount = 0;
      this.timeoutHandler = null;
    }
  }

  mousedown() {
    this.timeoutHandler = setInterval(() => {
      this.busterBetAmount += 1;
    }, 100);
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    let sideBets = {
      busterBetAmount: 0,//this.busterBetAmount,
      fortuneBetAmount: 0,//this.fortuneBetAmount,
      aupairBetAmount: 0//this.aupairBetAmount
    }
    this.dialogRef.close({ event: 'close', data: sideBets });
  }

}
