import { Component, Inject, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { User } from "../../../../infrastructure/auth/model/user.model";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {ToursService} from "../../tours.service";

@Component({
  selector: 'app-pdf-requests-prompt',
  templateUrl: './pdf-requests-prompt.component.html',
  styleUrls: ['./pdf-requests-prompt.component.css'],
  animations: [
    trigger('buttonState', [
      state('clicked', style({
        transform: 'scale(0.9)',
        opacity: 0.5
      })),
      transition('* => clicked', [
        animate('200ms')
      ]),
      transition('clicked => idle', [
        animate('200ms')
      ])
    ]),
  ],
})
export class PdfRequestsPromptComponent implements OnInit{
  cancelButtonState: string = 'idle';
  acceptButtonState: string = 'idle';
  focused: string = '';
  user: User | undefined;
  pdfUrl: SafeResourceUrl | undefined;

  constructor(private toursService: ToursService,
              private snackBar: MatSnackBar,
              private sanitizer: DomSanitizer,
              private dialogRef: MatDialogRef<PdfRequestsPromptComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.loadPdf();
  }

  loadPdf(): void {
    this.toursService.seeGeneratedReport().subscribe((pdfBlob: Blob) => {
      const url = URL.createObjectURL(pdfBlob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  cancelButtonClicked(){
    this.cancelButtonState = 'clicked';
    setTimeout(() => { this.cancelButtonState = 'idle'; }, 200);
    this.dialogRef.close();
  }

  overviewClicked(){
    this.dialogRef.close();
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  saveGeneratedReport(): void{
    this.toursService.saveGeneratedReport().subscribe((pdfBlob: Blob) => {
    });
  }

}
