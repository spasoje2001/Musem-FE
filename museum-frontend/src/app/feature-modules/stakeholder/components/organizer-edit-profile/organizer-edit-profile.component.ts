import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { OrganizerEditProfile } from '../../model/organizer-edit-profile.model';
import { Organizer } from '../../model/organizer.model';
import { OrganizerService } from '../../services/organizer.service';

@Component({
  selector: 'app-organizer-edit-profile',
  templateUrl: './organizer-edit-profile.component.html',
  styleUrls: ['./organizer-edit-profile.component.css', '../shared-styles.css']
})
export class OrganizerEditProfileComponent implements OnInit {

  organizer?: Organizer;
  canChangeUsername: Boolean = true;
  canChangeEmail: Boolean = true;

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    biography: new FormControl(''),
  })

  constructor(
    private organizerService: OrganizerService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOrganizer();
  }

  loadOrganizer(): void {
    this.organizerService.getLoggedInOrganizer().subscribe(organizer => {
      this.organizer = organizer;

      this.profileForm.controls['firstName'].setValue(this.organizer.firstName);
      this.profileForm.controls['lastName'].setValue(this.organizer.lastName);
      this.profileForm.controls['username'].setValue(this.organizer.username);
      this.profileForm.controls['email'].setValue(this.organizer.email);
      this.profileForm.controls['biography'].setValue(this.organizer.biography);
    });
  }

  update() {
    if (this.canChangeEmail && this.canChangeUsername) {
      var updated: OrganizerEditProfile = {
        username: this.profileForm.value.username || '',
        firstName: this.profileForm.value.firstName || '',
        lastName: this.profileForm.value.lastName || '',
        email: this.profileForm.value.email || '',
        biography: this.profileForm.value.biography || '',
      };
  
      this.organizerService.updateProfile(updated).subscribe({
        next: () => {
          this.router.navigate(['/profile']);
        }
      })
    }
  }

  canChangeUsernameCheck() {
    const username = this.profileForm.value.username;
    this.authService.canChangeUsername(username || '').subscribe({
      next: (result) => {
        this.canChangeUsername = result.value;
      },
    })
  }

  canChangeEmailCheck() {
    const email = this.profileForm.value.email;
    this.authService.canChangeEmail(email || '').subscribe({
      next: (result) => {
        this.canChangeEmail = result.value;
      },
    })
  }

}
