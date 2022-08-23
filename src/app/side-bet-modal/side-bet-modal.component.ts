import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-side-bet-modal',
  templateUrl: './side-bet-modal.component.html',
  styleUrls: ['./side-bet-modal.component.css']
})
export class SideBetModalComponent implements OnInit {
  busterBetAmount: number = 0;
  fortuneBetAmount: number = 0;
  aupairBetAmount: number = 0;

  constructor(public dialogRef: MatDialogRef<SideBetModalComponent>) { }

  ngOnInit(): void {
  }

  addSideBets() {
    if (this.busterBetAmount == 0 && this.fortuneBetAmount == 0 && this.aupairBetAmount == 0)
      alert("Please place a side bet!");
    else {
      let sideBets = {
        busterBetAmount: this.busterBetAmount,
        fortuneBetAmount: this.fortuneBetAmount,
        aupairBetAmount: this.aupairBetAmount
      }
      this.dialogRef.close({ event: 'close', data: sideBets });
    }
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }

}
