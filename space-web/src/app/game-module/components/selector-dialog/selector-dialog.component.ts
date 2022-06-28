import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from "rxjs";

export interface SelectorDialogData {
  options: Observable<string[]>;
  title: string;
}

@Component({
  selector: 'selector-dialog-component',
  templateUrl: './selector-dialog.component.html',
  styleUrls: [
    './selector-dialog.component.scss'
  ]
})
export class SelectorDialogComponent {

  selectedOption!: string;

  constructor(
    public dialogRef: MatDialogRef<SelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectorDialogData,
  ) {
    dialogRef.disableClose = true;
  }

  onSubmit(): void {
    if (!this.selectedOption) {
      return;
    }

    this.dialogRef.close(this.selectedOption);
  }
}
