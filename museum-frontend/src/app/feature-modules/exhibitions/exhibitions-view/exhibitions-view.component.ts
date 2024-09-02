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

  searchCriteria: Partial<ExhibitionSearchRequestDTO> = {
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
    this.updateFilterCounts();  // Poziv ovde

    this.loadExhibitions();
}


  onExhibitionInfoCriteriaChanged(criteria: Partial<ExhibitionSearchRequestDTO>) {
    this.searchCriteria = { ...this.searchCriteria, ...criteria };
    this.updateFilterCounts();  // Poziv ovde
  }




  onItemsInfoCriteriaChanged(criteria: Partial<ExhibitionSearchRequestDTO>) {
    this.searchCriteria = { ...this.searchCriteria, ...criteria };
    this.updateFilterCounts();  // Poziv ovde
}



onReviewsInfoCriteriaChanged(criteria: Partial<ExhibitionSearchRequestDTO>) {
  this.searchCriteria = { ...this.searchCriteria, ...criteria };
  this.updateFilterCounts();  // Poziv ovde
}



searchExhibitions(): void {
  // Kreiraj kopiju searchCriteria objekta
  const searchCriteriaCopy = { ...this.searchCriteria };

  // Formatiraj datume u dd.MM.yyyy format ako su prisutni
  if (searchCriteriaCopy.startDate) {
      searchCriteriaCopy.startDate = moment(searchCriteriaCopy.startDate).format('DD.MM.YYYY.');
  }
  if (searchCriteriaCopy.endDate) {
      searchCriteriaCopy.endDate = moment(searchCriteriaCopy.endDate).format('DD.MM.YYYY.');
  }

  // Pošalji kopiju searchCriteria objekta sa formatiranim datumima
  console.log(searchCriteriaCopy)
  this.exhibitionService.searchExhibitions(searchCriteriaCopy).subscribe({
      next: (result: Exhibition[]) => {
          console.log("Resultat search-a: ", result);
          this.exhibitions = result;
          this.applyFilter();
          this.activeDropdown = null;
      },
      error: (err) => {
          console.error("Search failed", err);
      }
  });
}


updateFilterCounts(): void {
  const exhibitionKeys = ['name', 'description', 'theme', 'startDate', 'endDate', 'organizer', 'curator'];
  const itemsKeys = ['itemName', 'itemDescription', 'itemAuthorsName', 'itemPeriod', 'itemCategory'];
  const reviewsKeys = ['comment', 'guest'];

  this.exhibitionInfoFiltersCount = exhibitionKeys.filter(key => {
      const criteriaKey = key as keyof ExhibitionSearchRequestDTO;
      return (
          this.searchCriteria[criteriaKey] !== undefined &&
          this.searchCriteria[criteriaKey] !== '' &&
          this.searchCriteria[criteriaKey] !== null
      );
  }).length;

  this.itemsInfoFiltersCount = itemsKeys.filter(key => {
      const criteriaKey = key as keyof ExhibitionSearchRequestDTO;
      return (
          this.searchCriteria[criteriaKey] !== undefined &&
          this.searchCriteria[criteriaKey] !== '' &&
          this.searchCriteria[criteriaKey] !== null
      );
  }).length;

  this.reviewsInfoFiltersCount = reviewsKeys.filter(key => {
      const criteriaKey = key as keyof ExhibitionSearchRequestDTO;
      return (
          this.searchCriteria[criteriaKey] !== undefined &&
          this.searchCriteria[criteriaKey] !== '' &&
          this.searchCriteria[criteriaKey] !== null
      );
  }).length;

  // Posebna provera za minRating
  if (this.searchCriteria.minRating && this.searchCriteria.minRating > 0) {
      this.reviewsInfoFiltersCount += 1;
  }
}



  



}
