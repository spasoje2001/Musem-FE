import { Component } from '@angular/core';
import { Exhibition, ExhibitionSearchRequestDTO, ExhibitionStatus, ExhibitionTheme, ItemCategory } from '../model/exhibition.model';
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

  activeDropdown: string | null = null;
  exhibitionInfoFiltersCount: number = 0;
  itemsInfoFiltersCount: number = 0;
  reviewsInfoFiltersCount: number = 0;

  searchCriteria: {
    name: string;
    description: string;
    theme: ExhibitionTheme | undefined;
    startDate: string;
    endDate: string;
    organizer: string;
    curator: string;
    itemName: string;
    itemDescription: string;
    itemAuthorsName: string;
    itemPeriod: string;
    itemCategory: ItemCategory | undefined;
    minRating: number;
    comment: string;
    guest: string;
  } = {
    name: '',
    description: '',
    theme: undefined,  // Allow theme to be undefined
    startDate: '',
    endDate: '',
    organizer: '',
    curator: '',
    itemName: '',
    itemDescription: '',
    itemAuthorsName: '',
    itemPeriod: '',
    itemCategory: undefined,  // Allow itemCategory to be undefined
    minRating: 0,
    comment: '',
    guest: ''
  };

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

  toggleDropdown(dropdown: string): void {
    this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
  }

  resetFilters(): void {
    this.searchCriteria = {
      name: '',
      description: '',
      theme: undefined,
      startDate: '',
      endDate: '',
      organizer: '',
      curator: '',
      itemName: '',
      itemDescription: '',
      itemAuthorsName: '',
      itemPeriod: '',
      itemCategory: undefined,
      minRating: 0,
      comment: '',
      guest: ''
  };
    this.exhibitionInfoFiltersCount = 0;
    this.itemsInfoFiltersCount = 0;
    this.reviewsInfoFiltersCount = 0;
  }

  onExhibitionInfoCriteriaChanged(criteria: Partial<ExhibitionSearchRequestDTO>) {
    this.searchCriteria = { ...this.searchCriteria, ...criteria };
    this.exhibitionInfoFiltersCount = Object.keys(criteria)
        .filter(key => criteria[key as keyof ExhibitionSearchRequestDTO] !== undefined && criteria[key as keyof ExhibitionSearchRequestDTO] !== '').length;
}



onItemsInfoCriteriaChanged(criteria: Partial<ExhibitionSearchRequestDTO>) {
  this.searchCriteria = { ...this.searchCriteria, ...criteria };
  this.itemsInfoFiltersCount = Object.keys(criteria)
      .filter(key => {
          const typedKey = key as keyof ExhibitionSearchRequestDTO;
          return criteria[typedKey] !== undefined && criteria[typedKey] !== '';
      }).length;
}


onReviewsInfoCriteriaChanged(criteria: Partial<ExhibitionSearchRequestDTO>) {
  this.searchCriteria = { ...this.searchCriteria, ...criteria };
  this.reviewsInfoFiltersCount = Object.keys(criteria)
      .filter(key => {
          const typedKey = key as keyof ExhibitionSearchRequestDTO;
          return criteria[typedKey] !== undefined && criteria[typedKey] !== '';
      }).length;
}


  searchExhibitions(): void {
    this.exhibitionService.searchExhibitions(this.searchCriteria).subscribe({
      next: (result: Exhibition[]) => {
        this.filteredExhibitions = result;
        this.activeDropdown = null;
      },
      error: (err) => {
        console.error("Search failed", err);
      }
    });
  }


}
