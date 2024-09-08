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
import { ArtifactsComponent } from './feature-modules/items/artifacts/artifacts.component'; 
import { UserProfileComponent } from './feature-modules/stakeholder/components/user-profile/user-profile.component';
import { EditProfileComponent } from './feature-modules/stakeholder/components/edit-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuestProfileComponent } from './feature-modules/stakeholder/components/guest-profile/guest-profile.component';
import { OrganizerProfileComponent } from './feature-modules/stakeholder/components/organizer-profile/organizer-profile.component';
import { CuratorProfileComponent } from './feature-modules/stakeholder/components/curator-profile/curator-profile.component';
import { CuratorEditProfileComponent } from './feature-modules/stakeholder/components/curator-edit-profile/curator-edit-profile.component';
import { GuestEditProfileComponent } from './feature-modules/stakeholder/components/guest-edit-profile/guest-edit-profile.component';
import { OrganizerEditProfileComponent } from './feature-modules/stakeholder/components/organizer-edit-profile/organizer-edit-profile.component';
import { AdministratorEditProfileComponent } from './feature-modules/stakeholder/components/administrator-edit-profile/administrator-edit-profile.component';
import { AdministratorProfileComponent } from './feature-modules/stakeholder/components/administrator-profile/administrator-profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ItemsModule } from './feature-modules/items/items.module';
import { MatButtonModule } from '@angular/material/button';
import { ExhibitionsModule } from './feature-modules/exhibitions/exhibitions.module';
import { MatNativeDateModule } from '@angular/material/core';
import { DeleteConfirmationDialogComponent } from './feature-modules/stakeholder/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { DateTransformPipe } from './feature-modules/exhibitions/date-transform.pipe';



@NgModule({
  declarations: [
    AppComponent, 
    UserProfileComponent,
    EditProfileComponent,
    GuestProfileComponent,
    OrganizerProfileComponent,
    CuratorProfileComponent,
    CuratorEditProfileComponent,
    GuestEditProfileComponent,
    OrganizerEditProfileComponent,
    AdministratorEditProfileComponent,
    AdministratorProfileComponent,
    DeleteConfirmationDialogComponent,
    DateTransformPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    LayoutModule,
    MatDialogModule,
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AuthModule,
    HttpClientModule,
    MatDialogModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    ExhibitionsModule,
    BrowserAnimationsModule, // Make sure BrowserAnimationsModule is also imported
    MatSnackBarModule, // Add MatSnackBarModule here,
    FormsModule,
    MatNativeDateModule,
    MatMenuModule
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
