import { Component } from '@angular/core';
import { Exhibition } from '../model/exhibition.model';
import { ActivatedRoute } from '@angular/router';
import { ExhibitionsService } from '../exhibitions.service';

@Component({
  selector: 'app-exhibition-details',
  templateUrl: './exhibition-details.component.html',
  styleUrls: ['./exhibition-details.component.css']
})
export class ExhibitionDetailsComponent {

  exhibition!: Exhibition;

  constructor(
    private route: ActivatedRoute,
    private exhibitionService: ExhibitionsService
  ) {}

  ngOnInit() {
    // Get the exhibition ID from the route parameters
    const id = this.route.snapshot.params['id'];
    // Fetch the exhibition details using the service
    this.exhibitionService.getExhibitionById(id).subscribe({
      next: (exhibition: Exhibition) => {
        this.exhibition = exhibition;
        console.log(this.exhibition);
      },
      error: (err) => {
        console.error('Error fetching exhibition:', err);
      }
    });
  }
}
