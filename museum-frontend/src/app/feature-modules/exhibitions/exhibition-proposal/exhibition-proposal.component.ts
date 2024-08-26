import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ExhibitionProposal, ExhibitionProposalRequest, Room } from '../model/exhibition.model';
import { RoomService } from '../room.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { ProposalService } from '../proposal.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  isEditMode: boolean = false;
  minEndDate: string | null = null;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
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

    this.proposalForm.get('adultPrice')?.valueChanges.subscribe(() => {
      this.validateMinorPrice();
    });

    this.proposalForm.get('minorPrice')?.valueChanges.subscribe(() => {
      this.validateMinorPrice();
    });

    if (data.proposal) {
      this.isEditMode = true;
      this.populateForm(data.proposal);
    }
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }

  populateForm(proposal: ExhibitionProposal): void {
    const startDateParts = proposal.startDate.split('.');
    const endDateParts = proposal.endDate.split('.');

    const startDateFormatted = `${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`;
    const endDateFormatted = `${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`;

    this.proposalForm.patchValue({
        startDate: startDateFormatted,
        endDate: endDateFormatted,
        adultPrice: proposal.priceList.adultPrice,
        minorPrice: proposal.priceList.minorPrice,
        roomId: proposal.roomReservation.room.id
    });

    this.minEndDate = startDateFormatted;

    this.selectedRoom = proposal.roomReservation.room;

    this.roomService.getAvailableRooms(proposal.startDate, proposal.endDate).subscribe(
        (rooms: Room[]) => {

          
            this.availableRooms = rooms;

            this.availableRooms = rooms.sort((a, b) => a.number - b.number);
            // Ensure the current room is included in available rooms
            if (!this.availableRooms.find(room => room.id === this.selectedRoom!.id)) {
                this.availableRooms.unshift(this.selectedRoom!);
            }
        },
        (error) => {
            this.snackBar.open('Error fetching available rooms', 'Close', {
                duration: 3000,
            });
        }
    );
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

  close(createdUpdated: boolean): void {
    if(createdUpdated){
      this.dialogRef.close(true);
    }else{
      this.dialogRef.close();
    }
    
  }

  onDatesSelected(): void {
    const { startDate, endDate } = this.proposalForm.value;

    const today = new Date();
    const oneWeekLater = new Date(today.setDate(today.getDate() + 7));
    const selectedStartDate = new Date(startDate);
    
    if (selectedStartDate < oneWeekLater) {
      this.snackBar.open('Start Date must be at least one week from today.', 'Close', {
        duration: 3000,
      });
      this.proposalForm.patchValue({ startDate: '' }); // Reset startDate
      return;
    }
    
    if (startDate && endDate) {
        const formattedStartDate = this.datePipe.transform(startDate, 'dd.MM.yyyy.');
        const formattedEndDate = this.datePipe.transform(endDate, 'dd.MM.yyyy.');

        if (selectedStartDate >= new Date(endDate)) {
          const newEndDate = new Date(selectedStartDate);
          newEndDate.setDate(newEndDate.getDate() + 1);
          this.proposalForm.patchValue({
            endDate: this.datePipe.transform(newEndDate, 'yyyy-MM-dd')
          });
          this.snackBar.open('End Date is moved with the start date.', 'Close', {
            duration: 3000,
          });
        }

        if (this.isEditMode) {
            // If in edit mode, call the update-specific endpoint
            this.roomService.getAvailableRoomsForUpdate(formattedStartDate!, formattedEndDate!, this.data.proposal.id).subscribe(
                (rooms: Room[]) => {
                    // Sort rooms by number
                    this.availableRooms = rooms.sort((a, b) => a.number - b.number);
                    
                    // Check if the previously selected room is still available
                    const previouslySelectedRoom = this.availableRooms.find(room => room.id === this.selectedRoom?.id);
                    
                    if (previouslySelectedRoom) {
                        // Keep the room selected if it's still available
                        this.selectRoom(previouslySelectedRoom);
                    } else {
                        // Clear the selection if the room is no longer available
                        this.selectedRoom = null;
                        this.proposalForm.patchValue({ roomId: null });
                    }
                },
                (error: any) => {
                    this.snackBar.open('Error fetching available rooms', 'Close', {
                        duration: 3000,
                    });
                }
            );
        } else {
            // If not in edit mode, call the standard available rooms endpoint
            this.roomService.getAvailableRooms(formattedStartDate!, formattedEndDate!).subscribe(
                (rooms: Room[]) => {
                    this.availableRooms = rooms.sort((a, b) => a.number - b.number);
                },
                (error: any) => {
                    this.snackBar.open('Error fetching available rooms', 'Close', {
                        duration: 3000,
                    });
                }
            );
        }
    }
  }


  selectRoom(room: Room): void {
    this.selectedRoom = room;
    this.proposalForm.patchValue({ roomId: room.id });
  }

  onSubmit(): void {
    if (this.proposalForm.valid && this.selectedRoom) {
      const proposal: ExhibitionProposalRequest = {
        startDate: this.datePipe.transform(this.proposalForm.get('startDate')?.value, 'dd.MM.yyyy.')!,
        endDate: this.datePipe.transform(this.proposalForm.get('endDate')?.value, 'dd.MM.yyyy.')!,
        organizerId: this.user!.id, // Ensure correct organizer ID
        roomId: this.selectedRoom.id,
        adultPrice: this.proposalForm.get('adultPrice')?.value,
        minorPrice: this.proposalForm.get('minorPrice')?.value,
      };

      if (this.isEditMode) {
        // Update existing proposal
        this.proposalService.updateProposal(this.data.proposal.id, proposal).subscribe({
          next: (response) => {
            this.close(true);
            this.snackBar.open('Proposal updated successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: ['snackbar-success']
            });
          },
          error: () => {
            this.snackBar.open('Failed to update proposal.', 'Close', { duration: 3000 });
          }
        });
      } else {
        // Create new proposal
        this.proposalService.createProposal(proposal).subscribe({
          next: (response) => {
            console.log(response);
            this.close(true);
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
      }
  
    } else {
      this.snackBar.open('Please fill in all fields and select a room.', 'Close', { duration: 3000 });
    }
  }

  validateMinorPrice(): void {
    const adultPrice = this.proposalForm.get('adultPrice')?.value;
    const minorPriceControl = this.proposalForm.get('minorPrice');

    if (adultPrice === 0) {
      minorPriceControl?.setValue(0);
    } else if (minorPriceControl?.value >= adultPrice) {
      minorPriceControl?.setValue(adultPrice - 1);
    }
  }
}



