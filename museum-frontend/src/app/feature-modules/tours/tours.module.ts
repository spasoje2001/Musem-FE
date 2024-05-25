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
import { EditTourFormComponent } from './components/edit-tour-form/edit-tour-form.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ExhibitionChoosingDialogueComponent } from './components/exhibition-choosing-dialogue/exhibition-choosing-dialogue.component';
import { CuratorChoosingDialogueComponent } from './components/curator-choosing-dialogue/curator-choosing-dialogue.component';
import { TourPricelistViewComponent } from './components/tour-pricelist-view/tour-pricelist-view.component';
import { DenialExplanationComponent } from './components/denial-explanation/denial-explanation.component';
import { PdfHandledRequestsPromptComponent } from './components/pdf-handled-requests-prompt/pdf-handled-requests-prompt.component';
import { PdfRequestsPromptComponent } from './components/pdf-requests-prompt/pdf-requests-prompt.component';

@NgModule({
  declarations: [
    TourViewComponent,
    TourCardViewComponent,
    AddTourFormComponent,
    RemoveTourPromptComponent,
    EditTourFormComponent,
    EditTourFormComponent,
    AddTourRequestFormComponent,
    TourRequestsViewComponent,
    TourRequestCardViewComponent,
    DeclineRequestPromptComponent,
    AcceptRequestFormComponent,
    EditTourFormComponent,
    ExhibitionChoosingDialogueComponent,
    CuratorChoosingDialogueComponent,
    TourPricelistViewComponent,
    DenialExplanationComponent,
    PdfHandledRequestsPromptComponent,
    PdfRequestsPromptComponent
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
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  exports: [
    TourViewComponent
  ]
})
export class ToursModule { 

}