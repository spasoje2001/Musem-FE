import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exhibition, ExhibitionProposal, ExhibitionTheme } from '../model/exhibition.model';
import { MatDialog } from '@angular/material/dialog';
import { ProposalDetailsComponent } from '../proposal-details/proposal-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProposalService } from '../proposal.service';
import { ItemsService } from '../../items/items.service';
import { Item } from '../../items/model/item.model';
import { ExhibitionsService } from '../exhibitions.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Observable } from 'rxjs';
import { NotificationService } from '../../notifications/notification.service';

@Component({
  selector: 'app-create-exhibition',
  templateUrl: './create-exhibition.component.html',
  styleUrls: ['./create-exhibition.component.css']
})
export class CreateExhibitionComponent implements OnInit {
  exhibitionForm: FormGroup;
  themes = Object.values(ExhibitionTheme); // Replace with actual enum values
  allItems: Item[] = []; // Ovo će sadržavati sve iteme
  filteredItems: Item[] = []; // This will be populated with items filtered based on search
  proposal!: ExhibitionProposal;
  exhibitionId?: number;
  exhibition?: Exhibition;
  oldAdultPrice?: number;
  oldMinorPrice?: number;
  itemSearch = '';
  selectedItems: number[] = [];
  user: User | undefined;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private proposalService: ProposalService,
    private itemService: ItemsService,
    private exhibitionsService: ExhibitionsService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.exhibitionForm = this.fb.group({
      name: ['', Validators.required],
      theme: ['', Validators.required],
      shortDescription: ['', Validators.required],
      picture: ['', Validators.required],
      longDescription: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    // Retrieve proposalId from route parameters
    this.exhibitionId = +this.route.snapshot.paramMap.get('exhibitionId')!;
    const proposalId = this.route.snapshot.paramMap.get('proposalId');
    if (this.exhibitionId) {
      this.isEditMode = true;
      this.loadExhibitionById(this.exhibitionId);
    } else if (proposalId) {
      this.isEditMode = false;
      this.loadProposalById(+proposalId);
    }
  }

  loadExhibitionById(exhibitionId: number): void {
    this.exhibitionsService.getExhibitionById(exhibitionId).subscribe(
      (exhibition) => {
        this.exhibitionForm.patchValue({
          name: exhibition.name,
          theme: exhibition.theme,
          shortDescription: exhibition.shortDescription,
          picture: exhibition.picture,
          longDescription: exhibition.longDescription
        });
        this.selectedItems = exhibition.itemReservations.map(ir => ir.item.id!);
        console.log("Vec selektovani itemi:", this.selectedItems);
        
        this.exhibition = exhibition;
        this.proposal = exhibition.proposal;
        this.oldAdultPrice = this.proposal.priceList.adultPrice;
        this.oldMinorPrice = this.proposal.priceList.minorPrice;
        this.loadAvailableItems();
      },
      (error) => {
        console.error('Error loading exhibition:', error);
      }
    );
  }

  loadProposalById(proposalId: number): void {
    this.proposalService.getProposalById(proposalId).subscribe(
      (proposal: ExhibitionProposal) => {
        this.proposal = proposal;
        console.log('Proposal loaded:', this.proposal);
        this.loadAvailableItems();
      },
      (error) => {
        console.error('Error loading proposal:', error);
      }
    );
  }

  loadAvailableItems(): void {
    const startDate = this.isEditMode ? this.exhibition!.proposal.startDate : this.proposal.startDate;
    const endDate = this.isEditMode ? this.exhibition!.proposal.endDate : this.proposal.endDate;
    
    let itemServiceMethod: Observable<Item[]>;

    if (this.isEditMode) {
        itemServiceMethod = this.itemService.getAvailableItemsForUpdate(startDate, endDate, this.exhibition!.id);
    } else {
        itemServiceMethod = this.itemService.getAvailableItems(startDate, endDate);
    }

    itemServiceMethod.subscribe(
        (items: Item[]) => {
            console.log(items);
            this.allItems = items;
            this.filteredItems = items;
            console.log('Available items loaded:', this.filteredItems);
        },
        (error) => {
            console.error('Error loading items:', error);
        }
    );
}



  openProposalDetails(): void {
    this.dialog.open(ProposalDetailsComponent, {
      width: '400px',
      data: { proposal: this.proposal }  // Passing the loaded proposal data
    });
  }


  selectItem(item: Item): void {
    const itemId = item.id!;
    if (this.selectedItems.includes(itemId)) {
      this.selectedItems = this.selectedItems.filter(id => id !== itemId); // Deselect item
    } else {
      this.selectedItems.push(itemId); // Select item
    }
    console.log('Selected items:', this.selectedItems);
  }

  isSelected(item: Item): boolean {
    return this.selectedItems.includes(item.id!); // Check if the item is selected
  }

  filterItems(): void {
    console.log("nesto se desava");
    // Filtrirajte allItems umesto filteredItems
    this.filteredItems = this.allItems.filter(item =>
      item.name.toLowerCase().includes(this.itemSearch.toLowerCase())
    );
  }

  submit(): void {
    if (this.exhibitionForm.valid) {
      const exhibitionData = {
        ...this.exhibitionForm.value,
        itemIds: this.selectedItems,
        proposalId: this.proposal.id,
        curatorId: this.user!.id
      };

      console.log("Submit: ", this.selectedItems);

      if (this.isEditMode) {
        this.exhibitionsService.updateExhibition(this.exhibitionId!, exhibitionData).subscribe(
          response => {
            console.log('Exhibition updated successfully:', response);

            const newAdultPrice = this.proposal.priceList.adultPrice;
            const newMinorPrice = this.proposal.priceList.minorPrice;

            console.log("OVDE SAM1")

            if (newAdultPrice < this.oldAdultPrice! || newMinorPrice < this.oldMinorPrice!) {
              this.notificationService.notifyPromotion(this.exhibitionId!).subscribe(() => {
                console.log('Promotion notification sent successfully.');
              });
            }
            console.log("OVDE SAM")
            this.notificationService.notifyExhibitionUpdate(this.exhibitionId!).subscribe(() => {
              console.log('Notification for exhibition update sent successfully.');
            });
            //this.router.navigate(['/exhibitions-view']);
          },
          error => {
            console.error('Error updating exhibition:', error);
          }
        );
      } else {
        this.exhibitionsService.createExhibition(exhibitionData).subscribe(
          response => {
            console.log('Exhibition created successfully:', response);
            this.notificationService.notifyNewExhibition(response.id).subscribe(() => {
              console.log('Notification for new exhibition sent successfully.');
            });
            this.router.navigate(['/exhibitions-view']);
          },
          error => {
            console.error('Error creating exhibition:', error);
          }
        );
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/profile']); // Navigacija na profilnu stranicu
  }
}
