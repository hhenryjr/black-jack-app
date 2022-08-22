import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cheat-sheet-modal',
  templateUrl: './cheat-sheet-modal.component.html',
  // styleUrls: ['./cheat-sheet-modal.component.css']
})
export class CheatSheetModalComponent implements OnInit {
  cheatSheet: string = '../assets/cheatsheet.jpg';

  constructor(public dialogRef: MatDialogRef<CheatSheetModalComponent>) { }

  ngOnInit() {
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }
}
