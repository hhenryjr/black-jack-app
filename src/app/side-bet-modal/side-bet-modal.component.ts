import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-side-bet-modal',
  templateUrl: './side-bet-modal.component.html',
  styleUrls: ['./side-bet-modal.component.css']
})
export class SideBetModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SideBetModalComponent>) { }

  ngOnInit(): void {
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }

}
