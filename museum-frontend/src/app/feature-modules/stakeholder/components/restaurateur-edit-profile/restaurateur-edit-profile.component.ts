import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { RestaurateurEditProfile } from '../../model/restaurateur-edit-profile.model';
import { Restaurateur } from '../../model/restaurateur.model';
import { RestaurateurService } from '../../services/restaurateur.service';

@Component({
  selector: 'app-restaurateur-edit-profile',
  templateUrl: './restaurateur-edit-profile.component.html',
  styleUrls: ['./restaurateur-edit-profile.component.css', '../shared-styles.css']
})
export class RestaurateurEditProfileComponent {

  restaurateur?: Restaurateur;
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
    private restaurateurService: RestaurateurService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadRestaurateur();
  }

  loadRestaurateur(): void {
    this.restaurateurService.getLoggedInRestaurateur().subscribe(restaurateur => {
      this.restaurateur = restaurateur;

      this.profileForm.controls['firstName'].setValue(this.restaurateur.firstName);
      this.profileForm.controls['lastName'].setValue(this.restaurateur.lastName);
      this.profileForm.controls['username'].setValue(this.restaurateur.username);
      this.profileForm.controls['email'].setValue(this.restaurateur.email);
      this.profileForm.controls['biography'].setValue(this.restaurateur.biography);
    });
  }

  update() {
    if (this.canChangeEmail && this.canChangeUsername) {
      var updated: RestaurateurEditProfile = {
        username: this.profileForm.value.username || '',
        firstName: this.profileForm.value.firstName || '',
        lastName: this.profileForm.value.lastName || '',
        email: this.profileForm.value.email || '',
        biography: this.profileForm.value.biography || '',
      };
  
      this.restaurateurService.updateProfile(updated).subscribe({
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
