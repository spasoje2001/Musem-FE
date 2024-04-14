import { Component, OnInit } from '@angular/core';
import { Guest } from '../../model/guest.model';
import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'app-guest-profile',
  templateUrl: './guest-profile.component.html',
  styleUrls: ['./guest-profile.component.css', '../shared-styles.css']
})
export class GuestProfileComponent implements OnInit {

  guest?: Guest;

  constructor(
    private guestService: GuestService
  ) { }
  
  ngOnInit(): void {
    this.loadGuest();
  }
  
  loadGuest(): void {
    this.guestService.getLoggedInGuest().subscribe(guest => {
      this.guest = guest;
    });
  }

}
