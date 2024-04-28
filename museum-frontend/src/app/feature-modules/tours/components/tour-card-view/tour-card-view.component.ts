import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCoins, faPen, faTrash, faTicket } from "@fortawesome/free-solid-svg-icons";
import { Tour } from '../../model/tour.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { RemoveTourPromptComponent } from '../remove-tour-prompt/remove-tour-prompt.component';
import { EditTourFormComponent } from '../edit-tour-form/edit-tour-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToursService } from '../../tours.service';
import { Curator } from 'src/app/feature-modules/stakeholder/model/curator.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-tour-card-view',
  templateUrl: './tour-card-view.component.html',
  styleUrls: ['./tour-card-view.component.css'],
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
  ]
})
export class TourCardViewComponent implements OnInit{
  editButtonState: string = 'idle';   
  removeButtonState: string = 'idle'; 
  reserveTicketsButtonState: string = 'idle'; 
  @Input() tour!: Tour;
  private dialogRef: any;
  @Output() dialogRefClosed: EventEmitter<any> = new EventEmitter<any>();
  user: User | undefined;

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private toursService: ToursService,
              private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });

    this.toursService.getCuratorById(this.tour.guideId!).subscribe({
      next: (curator: Curator) => {
        this.tour.guide = curator;
      }
    })
  }

  editButtonClicked() {
    this.editButtonState = 'clicked'; 
    setTimeout(() => { this.editButtonState = 'idle'; }, 200); 
    this.dialogRef = this.dialog.open(EditTourFormComponent, {
      data: this.tour
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.dialogRefClosed.emit(result);
    });
  }

  removeButtonClicked(id: number) {
    this.removeButtonState = 'clicked'; 
    setTimeout(() => { this.removeButtonState = 'idle'; }, 200); 
    this.dialogRef = this.dialog.open(RemoveTourPromptComponent, {
      data: id
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.dialogRefClosed.emit(result);
    });
  }

  reserveTicketsButtonClicked(id: number){
    this.reserveTicketsButtonState = 'clicked'; 
    setTimeout(() => { this.reserveTicketsButtonState = 'idle'; }, 200); 
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      horizontalPosition: 'right', 
      verticalPosition: 'bottom', 
    });
  }

  faCoins = faCoins;
  faPen = faPen;
  faRemove = faTrash;
  faTicket = faTicket;
}
