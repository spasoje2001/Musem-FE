import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExhibitionsViewComponent } from './exhibitions-view/exhibitions-view.component';
import { ExhibitionCardComponent } from './exhibition-card/exhibition-card.component';
import { ExhibitionDetailsComponent } from './exhibition-details/exhibition-details.component';
import { ProposeExhibitionComponent } from './propose-exhibition/propose-exhibition.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfOrganizerExhibitionsPromptComponent } from './pdf-organizer-exhibitions-prompt/pdf-organizer-exhibitions-prompt.component';
import { PdfCuratorExhibitionsPromptComponent } from './pdf-curator-exhibitions-prompt/pdf-curator-exhibitions-prompt.component';




@NgModule({
  declarations: [
    ExhibitionsViewComponent,
    ExhibitionCardComponent,
    ExhibitionDetailsComponent,
    ProposeExhibitionComponent,
    PdfOrganizerExhibitionsPromptComponent,
    PdfCuratorExhibitionsPromptComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    ExhibitionCardComponent
  ]
})
export class ExhibitionsModule { }
