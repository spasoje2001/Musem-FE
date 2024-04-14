import { Component, OnInit } from '@angular/core';
import { Organizer } from '../../model/organizer.model';
import { OrganizerService } from '../../services/organizer.service';

@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css', '../shared-styles.css']
})
export class OrganizerProfileComponent implements OnInit {

  organizer?: Organizer;

  constructor(
    private guestService: OrganizerService
  ) { }
  
  ngOnInit(): void {
    this.loadOrganizer();
  }
  
  loadOrganizer(): void {
    this.guestService.getLoggedInOrganizer().subscribe(organizer => {
      this.organizer = organizer;
    });
  }

}
