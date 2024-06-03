import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { ExhibitionsService } from '../exhibitions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pdf-curator-exhibitions-prompt',
  templateUrl: './pdf-curator-exhibitions-prompt.component.html',
  styleUrls: ['./pdf-curator-exhibitions-prompt.component.css',],
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
  
export class PdfCuratorExhibitionsPromptComponent {
  cancelButtonState: string = 'idle';
  acceptButtonState: string = 'idle';
  focused: string = '';
  user: User | undefined;
  pdfUrl: SafeResourceUrl | undefined;

  constructor(private exhibitionsService: ExhibitionsService,
              private snackBar: MatSnackBar,
              private sanitizer: DomSanitizer,
              private dialogRef: MatDialogRef<PdfCuratorExhibitionsPromptComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.loadPdf();
  }

  loadPdf(): void {
    this.exhibitionsService.seeCuratorGeneratedReport().subscribe((pdfBlob: Blob) => {
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

  
}
