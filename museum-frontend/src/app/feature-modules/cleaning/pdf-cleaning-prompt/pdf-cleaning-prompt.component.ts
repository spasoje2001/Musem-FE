import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { CleaningService } from '../cleaning.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-cleaning-prompt',
  templateUrl: './pdf-cleaning-prompt.component.html',
  styleUrls: ['./pdf-cleaning-prompt.component.css'],
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
export class PdfCleaningPromptComponent {
  cancelButtonState: string = 'idle';   
  acceptButtonState: string = 'idle'; 
  focused: string = '';
  user: User | undefined;
  pdfUrl: SafeResourceUrl | undefined;

  constructor(private cleaningService: CleaningService,
              private snackBar: MatSnackBar, 
              private authService: AuthService,
              private sanitizer: DomSanitizer,
              private dialogRef: MatDialogRef<PdfCleaningPromptComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.authService.user$.subscribe(user => {
      this.user = user;
  });
}


ngOnInit(): void {
  this.loadPdf();
}

loadPdf(): void {
  this.cleaningService.seeGeneratedResport(this.user!.id).subscribe((pdfBlob: Blob) => {
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

  saveGeneratedResport(): void{
    this.cleaningService.saveGeneratedResport(this.user!.id).subscribe((pdfBlob: Blob) => {
    });
  }

}
