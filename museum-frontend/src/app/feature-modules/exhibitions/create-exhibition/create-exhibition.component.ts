import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExhibitionProposal, ExhibitionTheme } from '../model/exhibition.model';
import { MatDialog } from '@angular/material/dialog';
import { ProposalDetailsComponent } from '../proposal-details/proposal-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProposalService } from '../proposal.service';
import { ItemsService } from '../../items/items.service';
import { Item } from '../../items/model/item.model';
import { ExhibitionsService } from '../exhibitions.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

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
  itemSearch = '';
  selectedItems: number[] = [];
  user: User | undefined;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private proposalService: ProposalService,
    private itemService: ItemsService,
    private exhibitionsService: ExhibitionsService,
    private authService: AuthService
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
      console.log(user);
    });
    // Retrieve proposalId from route parameters
    const proposalId = this.route.snapshot.paramMap.get('proposalId');
    if (proposalId) {
      this.loadProposalById(+proposalId); // Convert proposalId to a number
    }
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
    this.itemService.getAvailableItems(this.proposal.startDate, this.proposal.endDate).subscribe(
      (items: Item[]) => {
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
    console.log('stisno')
    if (this.exhibitionForm.valid) {
      const createExhibitionData = {
        ...this.exhibitionForm.value,
        itemIds: this.selectedItems,
        proposalId: this.proposal.id,
        curatorId: this.user!.id
      };

      this.exhibitionsService.createExhibition(createExhibitionData).subscribe(
        response => {
          console.log('Exhibition created successfully:', response);
          this.router.navigate(['/exhibitions-view']); // Navigate to the exhibitions list page
        },
        error => {
          console.error('Error creating exhibition:', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/profile']); // Navigacija na profilnu stranicu
  }
}
