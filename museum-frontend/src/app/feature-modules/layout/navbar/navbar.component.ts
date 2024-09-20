import { Component } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { 
  faUser,
  faSignOut,
  faSignIn,
  faHome,
  faInstitution,
  faCalendar,
  faBuilding,
  faBookmark,
  faBinoculars,
  faPencilSquare,
  faAddressBook,
  faEnvelopeOpen,
  faArchive,
  faBell,
  faPaintBrush,
  faShoppingCart,
  faStar,
  faTag
 } from "@fortawesome/free-solid-svg-icons";
import { NotificationService } from '../../notifications/notification.service';
import { NotificationResponse, NotificationType } from '../../notifications/model/notification.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'xp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user: User | undefined;
  notifications: NotificationResponse[] = [];
  unreadNotificationsCount = 0;
  private notificationSubscription: Subscription;

  constructor(private authService: AuthService, private notificationService: NotificationService, private router: Router) {
    this.notificationSubscription = this.notificationService.notificationRefreshNeeded$.subscribe(
      (needRefresh) => {
        if (needRefresh) {
          this.loadNotifications();  // Call your method to load or refresh notifications
        }
      }
    );
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (this.user) {
        this.loadNotifications();
      }
    });
  }

  loadNotifications(): void {
    this.notificationService.getNotificationsByUserId(this.user!.id).subscribe({
      next: (notifications: NotificationResponse[]) => {
        // Filtriranje nepročitanih notifikacija
        this.notifications = notifications
          .filter(notification => !notification.read)
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        
        // Računanje broja nepročitanih notifikacija
        this.unreadNotificationsCount = this.notifications.length;
        
        console.log("Broj neprocitanih poruka: ", this.unreadNotificationsCount);
        console.log(this.notifications);
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
      }
    });
  }
  
  

  getNotificationIcon(type: NotificationType): any {
    switch (type) {
      case NotificationType.EXHIBITION:
        return faPaintBrush;
      case NotificationType.PURCHASE:
        return faShoppingCart;
      case NotificationType.REVIEW:
        return faStar;
      case NotificationType.PROMOTION:
        return faTag;
      case NotificationType.REMINDER:
        return faBell;
      default:
        return faBell; // Podrazumevana ikona
    }
  }

  onLogout(): void {
    this.authService.logout();
  }

  navigateTo(actionUrl: string, notificationId: number): void {
    if (actionUrl) {
      // Navigacija na određeni URL
      this.router.navigate([actionUrl]).then(() => {
        // Nakon navigacije, označi notifikaciju kao pročitanu
        this.notificationService.markAsRead(notificationId).subscribe({
          next: () => {
            // Ukloni pročitanu notifikaciju iz liste prikazanih nepročitanih
            this.notifications = this.notifications.filter(notification => notification.id !== notificationId);
            this.unreadNotificationsCount = this.notifications.length;
            this.loadNotifications();
          },
          error: (error) => {
            console.error('Error marking notification as read:', error);
          }
        });
      });
    }
  }
  
  ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();  // Prevent memory leaks
  }

  
  

  faUser = faUser;
  faSignOut = faSignOut;
  faSignIn = faSignIn;
  faPencilSquare = faPencilSquare;
  faHome = faHome;
  faInstitution = faInstitution;
  faCalendar = faCalendar;
  faBuilding = faBuilding;
  faBookmark = faBookmark;
  faBinoculars = faBinoculars;
  faAdressBook = faAddressBook;
  faEnvelopeOpen = faEnvelopeOpen;
  faArchive = faArchive;
  faBell = faBell;
}
