import { Component, OnInit } from '@angular/core';
import { Guest } from '../../model/guest.model';
import { GuestService } from '../../services/guest.service';
import { TicketService } from 'src/app/feature-modules/exhibitions/ticket.service';
import { Ticket } from 'src/app/feature-modules/exhibitions/model/ticket.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-profile',
  templateUrl: './guest-profile.component.html',
  styleUrls: ['./guest-profile.component.css', '../shared-styles.css']
})
export class GuestProfileComponent implements OnInit {

  guest?: Guest;
  tickets: Ticket[] = [];

  constructor(private guestService: GuestService, private ticketService: TicketService, private router: Router) {}

  ngOnInit(): void {
    this.loadGuestData();
  }

  loadGuestData(): void {
    this.guestService.getLoggedInGuest().subscribe(guest => {
      this.guest = guest;
      if (guest) {
        console.log('Gost: ', guest);
        if(!guest.picture){
          guest.picture = 'assets/default-profile-picture.png';
        }
        this.loadTickets(guest.id);
      }
    });
  }

  loadTickets(guestId: number): void {
    this.ticketService.getTicketsByUserId(guestId).subscribe(tickets => {
      this.tickets = tickets.sort((a, b) => b.id - a.id); // Sortiranje po ID-ju opadajuće
      console.log("Ucitane karte: ", this.tickets);
    });
  }

  navigateToExhibition(exhibitionId: number) {
    this.router.navigate([`/exhibitions/${exhibitionId}`]);
  }

}
