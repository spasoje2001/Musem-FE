import { Component } from '@angular/core';
import { Exhibition } from '../model/exhibition.model';
import { ActivatedRoute } from '@angular/router';
import { ExhibitionsService } from '../exhibitions.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TicketService } from '../ticket.service';
import { BookTickets, Ticket } from '../model/ticket.model';
import { CreateReview, Review } from '../model/review.model';
import { ReviewService } from '../review.service';
import { NotificationService } from '../../notifications/notification.service';

@Component({
  selector: 'app-exhibition-details',
  templateUrl: './exhibition-details.component.html',
  styleUrls: ['./exhibition-details.component.css']
})
export class ExhibitionDetailsComponent {

  exhibition!: Exhibition;
  visibleItems: any[] = [];
  itemsToShow = 3;
  selectedItem: any = null;
  user: User | undefined;
  reviews: Review[] = [];  // Store the fetched reviews
  viewMode: string = 'highlights';
  
  isBookingModalOpen = false;
  adultTickets = 0;
  minorTickets = 0;
  totalCost = 0;
  currentRating = 0;       // Track the rating selected by the user
  newComment = '';         // Track the user's comment

  hasTicket: boolean = false;

  fullStars: number = 0;
  hasHalfStar: boolean = false;



  constructor(
    private route: ActivatedRoute,
    private exhibitionService: ExhibitionsService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private ticketService: TicketService,
    private reviewService: ReviewService,
    private notificationService: NotificationService  
  ) {}

  
ngOnInit() {
  

  const id = this.route.snapshot.params['id'];
  console.log(this.hasTicket);
  this.authService.user$.subscribe(user => {
    this.user = user;
    if (this.user && this.user.role === 'GUEST') {
      this.checkIfUserHasTicket(id);
      
    }
  });
  this.exhibitionService.getExhibitionById(id).subscribe({
    next: (exhibition: Exhibition) => {
      this.exhibition = exhibition;
      this.calculateStars();
      this.visibleItems = this.exhibition.itemReservations.slice(0, this.itemsToShow);
    },
    error: (err) => {
      console.error('Error fetching exhibition:', err);
    }
  });
}

calculateStars() {
  // Računanje broja punih zvezdica i poluzvezdice na osnovu prosečne ocene
  this.fullStars = Math.floor(this.exhibition.averageRating);
  this.hasHalfStar = (this.exhibition.averageRating - this.fullStars) >= 0.5;
}

checkIfUserHasTicket(exhibitionId: number) {
  console.log('Checking tickets for exhibitionId:', exhibitionId);
  this.ticketService.getTicketsByUserId(this.user!.id).subscribe({
    next: (tickets: Ticket[]) => {
      console.log('Fetched tickets:', tickets);
      this.hasTicket = tickets.some(ticket => ticket.exhibitionId === +exhibitionId);
      console.log('Has ticket:', this.hasTicket);
    },
    error: (err) => {
      console.error('Error checking tickets:', err);
    }
  });
}

showMore() {
  const nextItems = this.exhibition.itemReservations.slice(this.visibleItems.length, this.visibleItems.length + this.itemsToShow);
  this.visibleItems = [...this.visibleItems, ...nextItems];
}

showItemDetails(item: any) {
  this.selectedItem = item;
}

closeModal() {
  this.selectedItem = null;
}

openBookingModal() {
  this.isBookingModalOpen = true;
  this.adultTickets = 1;
  this.minorTickets = 0;
  this.calculateTotalCost();
}

// Close booking modal
closeBookingModal() {
  this.isBookingModalOpen = false;
}

// Calculate total cost based on ticket selection
calculateTotalCost() {
  this.totalCost = (this.adultTickets * this.exhibition.proposal.priceList.adultPrice) + 
                   (this.minorTickets * this.exhibition.proposal.priceList.minorPrice);
}

incrementAdultTickets() {
  this.adultTickets++;
  this.calculateTotalCost();
}

decrementAdultTickets() {
  this.adultTickets = this.adultTickets > 0 ? this.adultTickets - 1 : 0;
  this.calculateTotalCost();
}

incrementMinorTickets() {
  this.minorTickets++;
  this.calculateTotalCost();
}

decrementMinorTickets() {
  this.minorTickets = this.minorTickets > 0 ? this.minorTickets - 1 : 0;
  this.calculateTotalCost();
}

finishBooking() {
  console.log(this.adultTickets);
  console.log(this.minorTickets);
  if (this.adultTickets + this.minorTickets === 0) {
    this.snackBar.open('Please select at least one ticket.', 'Close', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
    return;
  }

  const bookingDetails: BookTickets = {
    guestId: this.user?.id ?? 0, // Adjust according to your actual user object structure
    exhibitionId: this.exhibition.id,
    numberOfAdults: this.adultTickets,
    numberOfMinors: this.minorTickets,
    totalPrice: this.totalCost
  };

  this.ticketService.bookTickets(bookingDetails).subscribe({
    next: (ticket: Ticket) => {
      console.log(ticket);
      const message = `Booking successful! 
      Exhibition: ${ticket.exhibitionName}, 
      Adults: ${ticket.numberOfAdults}, 
      Minors: ${ticket.numberOfMinors}, 
      Total Price: $${ticket.totalPrice}`;

      this.snackBar.open(message, 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['success-snackbar']
      });
      this.hasTicket = true;
      this.closeBookingModal();

      this.notificationService.notifyPurchaseConfirmation(ticket.id).subscribe(
        () => {
          console.log('Purchase notification sent successfully');
        },
        (error) => {
          console.error('Error sending purchase notification:', error);
        }
      );
    },
    error: (err) => {
      this.snackBar.open('Booking failed. Please try again.', 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['error-snackbar']
      });
      console.error('Booking error:', err);
    }
  });
}

setViewMode(mode: string) {
  this.viewMode = mode;

  if (mode === 'comments') {
    this.fetchReviews();
  }
}

fetchReviews() {
  this.reviewService.getReviewsByExhibitionId(this.exhibition.id).subscribe({
    next: (reviews: Review[]) => {
      console.log(reviews);
      this.reviews = reviews;
    },
    error: (err) => {
      console.error('Error fetching reviews:', err);
    }
  });
}

setRating(rating: number) {
  this.currentRating = rating;
}

submitReview() {
  if (this.currentRating === 0 || this.newComment.trim() === '') {
    alert('Please provide a rating and a comment.');
    return;
  }

  const newReview: CreateReview = {
    guestId: this.user?.id ?? 0, // Adjust according to your actual user object structure
    exhibitionId: this.exhibition.id,
    rating: this.currentRating,
    comment: this.newComment,
  };

  // Assuming reviewService.addReview() sends the review to the backend
  this.reviewService.addReview(newReview).subscribe({
    next: (review: Review) => {
      this.fetchReviews(); // Add the new review to the list
      this.resetForm();
      this.notificationService.notifyNewReview(review.id).subscribe(
        () => {
          console.log('Review notification sent successfully');
        },
        (error) => {
          console.error('Error sending review notification:', error);
        }
      );
    },
    error: () => {
      alert('Failed to submit the review. Please try again.');
    }
  });
}

resetForm() {
  this.currentRating = 0;
  this.newComment = '';
}

isLoggedIn(): boolean{
    return this.user!.role === 'GUEST' || this.user!.role === 'ORGANIZER' || 
    this.user!.role === 'ADMIN' || this.user!.role === 'CURATOR';
}

shouldShowReviewForm(): boolean {
  return this.exhibition! && 
         (this.exhibition.status === 'OPENED' || this.exhibition.status === 'CLOSED') && 
         this.isLoggedIn() && 
         this.user!.role === 'GUEST' && 
         this.hasTicket;
}

shouldShowReviewMessage(): boolean {
  return this.exhibition! && 
         (this.exhibition.status === 'OPENED' || this.exhibition.status === 'CLOSED') && 
         this.isLoggedIn() &&  
         this.user!.role === 'GUEST' && 
         !this.hasTicket;
}

shouldHideReviewSection(): boolean {
  return this.isLoggedIn() && 
         (this.user!.role !== 'GUEST');
}

}
