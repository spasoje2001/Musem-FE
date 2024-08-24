import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExhibitionProposalRequest, Room } from '../model/exhibition.model';
import { RoomService } from '../room.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { ProposalService } from '../proposal.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exhibition-proposal',
  templateUrl: './exhibition-proposal.component.html',
  styleUrls: ['./exhibition-proposal.component.css'],
  providers: [DatePipe]
})
export class ExhibitionProposalComponent {
  proposalForm: FormGroup;
  availableRooms: Room[] = [];
  selectedRoom: Room | null = null;
  user: User | undefined;
  currentStep: number = 1; // Step indicator
  

  constructor(
    private roomService: RoomService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private authService: AuthService,
    private proposalService: ProposalService,
    public dialogRef: MatDialogRef<ExhibitionProposalComponent>
  ) {
    this.proposalForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      adultPrice: [0, [Validators.required, Validators.min(0)]], // Default value set to 0
      minorPrice: [0, [Validators.required, Validators.min(0)]], // Default value set to 0
      roomId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  datesSelected(): boolean {
    const { startDate, endDate } = this.proposalForm.value;
    return startDate && endDate;
  }

  close(): void {
    this.dialogRef.close();
  }

  onDatesSelected(): void {
    const { startDate, endDate } = this.proposalForm.value;
    console.log(startDate);
    console.log(endDate);
  
    if (startDate && endDate) {
      const formattedStartDate = this.datePipe.transform(startDate, 'dd.MM.yyyy.');
      const formattedEndDate = this.datePipe.transform(endDate, 'dd.MM.yyyy.');
      
      console.log(formattedStartDate);
      console.log(formattedEndDate);
      this.roomService.getAvailableRooms(formattedStartDate!, formattedEndDate!).subscribe(
        (rooms: Room[]) => {
          this.availableRooms = rooms.sort((a, b) => a.number - b.number);
        },
        (error: any) => {  // Explicitly specify the type of error as 'any'
          this.snackBar.open('Error fetching available rooms', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

  selectRoom(room: Room): void {
    this.selectedRoom = room;
    this.proposalForm.patchValue({ roomId: room.id });
  }

  onSubmit(): void {
    if (this.proposalForm.valid && this.selectedRoom) {
      const formattedStartDate = this.datePipe.transform(this.proposalForm.get('startDate')?.value, 'dd.MM.yyyy.');
      const formattedEndDate = this.datePipe.transform(this.proposalForm.get('endDate')?.value, 'dd.MM.yyyy.');
  
      const proposal: ExhibitionProposalRequest = {
        startDate: formattedStartDate!,
        endDate: formattedEndDate!,
        organizerId: this.user!.id,
        roomId: this.selectedRoom.id,
        adultPrice: this.proposalForm.get('adultPrice')?.value,
        minorPrice: this.proposalForm.get('minorPrice')?.value,
      };
  
      this.proposalService.createProposal(proposal).subscribe({
        next: (response) => {
          console.log(response);
          this.close();
          this.snackBar.open('Proposal created successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['snackbar-success']
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create proposal.', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['snackbar-error']
          });
        }
      });
    } else {
      this.snackBar.open('Please fill in all fields and select a room.', 'Close', { duration: 3000 });
    }
  }
}

