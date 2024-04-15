import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MaterialModule } from "src/app/infrastructure/material/material-module";
import { AdministrationModule } from "../administration/administration.module";
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { AddTourFormComponent } from "./components/add-tour-form/add-tour-form.component";
import { TourCardViewComponent } from "./components/tour-card-view/tour-card-view.component";
import { TourViewComponent } from "./components/tour-view/tour-view.component";
import { RemoveTourPromptComponent } from './components/remove-tour-prompt/remove-tour-prompt.component';
import { AddTourRequestFormComponent } from './components/add-tour-request-form/add-tour-request-form.component';
import { TourRequestsViewComponent } from './components/tour-requests-view/tour-requests-view.component';
import { TourRequestCardViewComponent } from './components/tour-request-card-view/tour-request-card-view.component';
import { DeclineRequestPromptComponent } from './components/decline-request-prompt/decline-request-prompt.component';
import { AcceptRequestFormComponent } from './components/accept-request-form/accept-request-form.component';

@NgModule({
  declarations: [
    TourViewComponent,
    TourCardViewComponent,
    AddTourFormComponent,
    RemoveTourPromptComponent,
    AddTourRequestFormComponent,
    TourRequestsViewComponent,
    TourRequestCardViewComponent,
    DeclineRequestPromptComponent,
    AcceptRequestFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,  
    MaterialModule,
    AdministrationModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  exports: [
    TourViewComponent
  ]
})
export class ToursModule { 

}