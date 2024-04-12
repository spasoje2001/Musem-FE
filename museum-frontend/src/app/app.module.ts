import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './infrastructure/routing/app-routing.module';
import { MaterialModule } from './infrastructure/material/material-module';
import { LayoutModule } from './feature-modules/layout/layout.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthModule } from './infrastructure/auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './infrastructure/auth/jwt/jwt.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserProfileComponent } from './feature-modules/stakeholder/components/user-profile/user-profile.component';
import { EditProfileComponent } from './feature-modules/stakeholder/components/edit-profile/edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GuestProfileComponent } from './feature-modules/stakeholder/components/guest-profile/guest-profile.component';
import { OrganizerProfileComponent } from './feature-modules/stakeholder/components/organizer-profile/organizer-profile.component';
import { CuratorProfileComponent } from './feature-modules/stakeholder/components/curator-profile/curator-profile.component';
import { RestaurateurProfileComponent } from './feature-modules/stakeholder/components/restaurateur-profile/restaurateur-profile.component';
import { RestaurateurEditProfileComponent } from './feature-modules/stakeholder/components/restaurateur-edit-profile/restaurateur-edit-profile.component';
import { CuratorEditProfileComponent } from './feature-modules/stakeholder/components/curator-edit-profile/curator-edit-profile.component';
import { GuestEditProfileComponent } from './feature-modules/stakeholder/components/guest-edit-profile/guest-edit-profile.component';
import { OrganizerEditProfileComponent } from './feature-modules/stakeholder/components/organizer-edit-profile/organizer-edit-profile.component';
import { AdministratorEditProfileComponent } from './feature-modules/stakeholder/components/administrator-edit-profile/administrator-edit-profile.component';
import { AdministratorProfileComponent } from './feature-modules/stakeholder/components/administrator-profile/administrator-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    EditProfileComponent,
    GuestProfileComponent,
    OrganizerProfileComponent,
    CuratorProfileComponent,
    RestaurateurProfileComponent,
    RestaurateurEditProfileComponent,
    CuratorEditProfileComponent,
    GuestEditProfileComponent,
    OrganizerEditProfileComponent,
    AdministratorEditProfileComponent,
    AdministratorProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatDialogModule,
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    HttpClientModule,
    MatDialogModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
