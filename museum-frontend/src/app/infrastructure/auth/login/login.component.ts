import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'xp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
export class LoginComponent {
  isPasswordVisible: boolean;
  buttonState: string = 'idle'; 
  focused: string = '';
  backgroundSize: string = '100% 110%';

  constructor(private authService: AuthService, 
              private router: Router,
              private snackBar: MatSnackBar,) {
    this.isPasswordVisible = false;
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login(): void {
    const login: Login = {
      username: this.loginForm.value.username || "",
      password: this.loginForm.value.password || "",
    };

    if (this.loginForm.valid) {
      this.buttonState = 'clicked'; 
      setTimeout(() => { this.buttonState = 'idle'; }, 200); 
      this.authService.login(login).subscribe({
        next: () => {
          this.showNotification('Successfully logged in!');
          this.router.navigate(['']);
        },
        error: err => {
          this.showNotification('Invalid username and password combination');
        },
      });
    }
    else{
      this.showNotification('Please fill out the form correctly');
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      horizontalPosition: 'right', 
      verticalPosition: 'bottom', 
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const scrollPercent = (scrollPosition / (docHeight - windowHeight)) * 100;

    const zoom = 100 + scrollPercent * 0.1; 

    this.backgroundSize = `${zoom}% ${zoom+10}%`;
  }

  faUser = faUser;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
}