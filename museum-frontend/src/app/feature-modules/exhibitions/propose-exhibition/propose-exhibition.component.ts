import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExhibitionsService } from '../exhibitions.service';
import { RoomService } from '../../events/services/room.service';
import { CuratorService } from '../../stakeholder/services/curator.service';
import { Curator } from '../model/exhibition.model';
import { Room } from '../../events/model/room.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-propose-exhibition',
  templateUrl: './propose-exhibition.component.html',
  styleUrls: ['./propose-exhibition.component.css']
})
export class ProposeExhibitionComponent {
  @Output() closeEmitter = new EventEmitter<void>();
  proposalForm!: FormGroup;
  availableRooms: Room[] = [];
  curators: Curator[] = [];

  constructor(
    private fb: FormBuilder,
    private exhibitionService: ExhibitionsService,
    private roomService: RoomService,
    private curatorService: CuratorService,
    public dialogRef: MatDialogRef<ProposeExhibitionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { organizerId: number }
  ) {
    this.createForm();
    this.loadCurators();
  }

  createForm() {
    this.proposalForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      roomId: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      curatorId: ['', Validators.required]
    });

    // Fetch available rooms when start and end dates change
    this.proposalForm.get('startDate')?.valueChanges.subscribe(() => {
      this.onDateChange();
    });
    this.proposalForm.get('endDate')?.valueChanges.subscribe(() => {
      this.onDateChange();
    });
  }

  // Load curators from the backend
  loadCurators() {
    this.curatorService.getAllCurators().subscribe({
      next: (curatorData) => {
        this.curators = curatorData;
      },
      error: (err) => {
        console.error('Failed to get curators', err);
      }
    });
  }

  onDateChange() {
    const startDate = this.proposalForm.get('startDate')?.value;
    const endDate = this.proposalForm.get('endDate')?.value;
    if (startDate && endDate) {
      this.roomService.getAvailableRooms(startDate, endDate)
        .subscribe(rooms => this.availableRooms = rooms);
    }
  }

  onSubmit() {
    if (this.proposalForm.valid) {
      this.exhibitionService.proposeExhibition(this.proposalForm.value).subscribe({
        next: (response) => {
          console.log(response);
          // Handle successful proposal
          this.dialogRef.close(response);
        },
        error: (error) => {
          // Handle error
          console.error('Error proposing exhibition', error);
        }
      });
    }
  }

  emitClose() {
    this.closeEmitter.emit(); // Emitting the event using the renamed EventEmitter
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = formatDate(date, 'dd.MM.yyyy.', 'en-US');
    return formattedDate;
  }
}
