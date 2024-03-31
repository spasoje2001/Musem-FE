import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Registration } from '../model/registration.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'xp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
    trigger('buttonState', [
      state('clicked', style({
        transform: 'scale(0.9)',
        opacity: 0.5
      })),
      transition('* => clicked', [
        animate('200ms')
      ]),
      transition('clicked => idle', [
        animate('200ms')
      ])
    ]),
  ]
})
export class RegistrationComponent {
  isPasswordVisible: boolean;
  isRepeatPasswordVisible: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.isPasswordVisible = false;
    this.isRepeatPasswordVisible = false;
  }

  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repeatpassword: new FormControl('', [Validators.required]),
  });

  buttonState: string = 'idle'; 
  focused: string = '';

  register(): void {
    const registration: Registration = {
      name: this.registrationForm.value.name || "",
      surname: this.registrationForm.value.surname || "",
      email: this.registrationForm.value.email || "",
      username: this.registrationForm.value.username || "",
      password: this.registrationForm.value.password || "",
    };

    if (this.registrationForm.valid) {
      if(this.registrationForm.value.password === this.registrationForm.value.repeatpassword){
        this.buttonState = 'clicked'; 
        setTimeout(() => { this.buttonState = 'idle'; }, 200); 
        this.authService.register(registration).subscribe({
          next: () => {
            this.router.navigate(['home']);
          },
        });
      } 
      else{
        console.log('Passwords do not match!'); // Treba dodati neki vid validacije
      }
    }
    else{
      console.log('Register form not valid!'); // Treba dodati neki vid validacije
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleRepeatPasswordVisibility() {
    this.isRepeatPasswordVisible = !this.isRepeatPasswordVisible;
  }

  faEye = faEye;
  faEyeSlash = faEyeSlash;
}