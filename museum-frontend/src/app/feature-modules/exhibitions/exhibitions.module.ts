import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExhibitionsViewComponent } from './exhibitions-view/exhibitions-view.component';
import { ExhibitionCardComponent } from './exhibition-card/exhibition-card.component';
import { ExhibitionDetailsComponent } from './exhibition-details/exhibition-details.component';
import { ProposeExhibitionComponent } from './propose-exhibition/propose-exhibition.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfOrganizerExhibitionsPromptComponent } from './pdf-organizer-exhibitions-prompt/pdf-organizer-exhibitions-prompt.component';
import { PdfCuratorExhibitionsPromptComponent } from './pdf-curator-exhibitions-prompt/pdf-curator-exhibitions-prompt.component';
import { ExhibitionProposalComponent } from './exhibition-proposal/exhibition-proposal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    ExhibitionsViewComponent,
    ExhibitionCardComponent,
    ExhibitionDetailsComponent,
    ProposeExhibitionComponent,
    PdfOrganizerExhibitionsPromptComponent,
    PdfCuratorExhibitionsPromptComponent,
    ExhibitionProposalComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatNativeDateModule
  ],
  exports: [
    ExhibitionCardComponent
  ]
})
export class ExhibitionsModule { }
