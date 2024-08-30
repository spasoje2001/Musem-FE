import { Component } from '@angular/core';
import { Exhibition } from '../model/exhibition.model';
import { MatDialog } from '@angular/material/dialog';
import { ExhibitionsService } from '../exhibitions.service';
import { NotificationService } from '../../notifications/notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-exhibitions-view',
  templateUrl: './exhibitions-view.component.html',
  styleUrls: ['./exhibitions-view.component.css']
})
export class ExhibitionsViewComponent {

  private dialogRef: any;
  exhibitions: Exhibition[] = [];
  slicedExhibitions: Exhibition[][] = [];
  activeFilter: string = 'current';
  filteredExhibitions: Exhibition[] = [];

  constructor(private dialog: MatDialog, private exhibitionService: ExhibitionsService, private notificationService: NotificationService){

  }

  ngOnInit(): void {
    this.loadExhibitions();
  }

  loadExhibitions(): void {
    this.exhibitionService.getExhibitions().subscribe({
      next: (result: Exhibition[] | Exhibition) => {
        console.log(result);
        if (Array.isArray(result)) {
          this.exhibitions = result;
          this.checkForUpcomingExhibitions();
          this.checkForClosingExhibitions();
          this.applyFilter();
        }
      }
    });
  }

  checkForUpcomingExhibitions(): void {
    const today = moment();
    const oneWeekFromNow = moment().add(7, 'days');

    this.exhibitions.forEach(exhibition => {
      if (exhibition.status === 'READY_TO_OPEN') {
        const exhibitionStartDate = moment(exhibition.proposal.startDate, "DD.MM.YYYY.");

        if (exhibitionStartDate.isBetween(today, oneWeekFromNow, undefined, '[]')) {
          this.notificationService.sendReminderForExhibition(exhibition.id).subscribe(() => {
            console.log(`Reminder sent for exhibition: ${exhibition.name}`);
          }, error => {
            console.error('Error sending reminder:', error);
          });
        }
      }
    });
  }

  checkForClosingExhibitions(): void {
    const today = moment();
    const oneWeekFromNow = moment().add(7, 'days');

    this.exhibitions.forEach(exhibition => {
      if (exhibition.status === 'OPENED') {
        const exhibitionEndDate = moment(exhibition.proposal.endDate, "DD.MM.YYYY.");

        if (exhibitionEndDate.isBetween(today, oneWeekFromNow, undefined, '[]')) {
          this.notificationService.notifyExhibitionClosingSoon(exhibition.id).subscribe(() => {
            console.log(`Closing soon notification sent for exhibition: ${exhibition.name}`);
          }, error => {
            console.error('Error sending closing soon notification:', error);
          });
        }
      }
    });
  }

  filterExhibitions(type: string): void {
    this.activeFilter = type;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.activeFilter === 'current') {
      this.filteredExhibitions = this.exhibitions.filter(
        exhibition => exhibition.status === 'OPENED'
      );
    } else if (this.activeFilter === 'upcoming') {
      this.filteredExhibitions = this.exhibitions.filter(
        exhibition => exhibition.status === 'READY_TO_OPEN'
      );
    } else if (this.activeFilter === 'past') {
      this.filteredExhibitions = this.exhibitions.filter(
        exhibition => exhibition.status === 'CLOSED'
      );
    }
  }

}
