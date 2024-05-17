import { CommonModule } from "@angular/common";
import { ArtifactFormComponent } from "./artifact-form/artifact-form.component";
import { ArtifactsComponent } from "./artifacts/artifacts.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MaterialModule } from "src/app/infrastructure/material/material-module";
import { ArtifactCardComponent } from './artifact-card/artifact-card.component';
import { ArtifactForDisplayComponent } from './artifact-for-display/artifact-for-display.component';
import { EditArtifactComponent } from './edit-artifact/edit-artifact.component';
import { PutArtifactIntoRoomPromptComponent } from './put-artifact-into-room-prompt/put-artifact-into-room-prompt.component';


@NgModule({
    declarations: [
      ArtifactsComponent,
      ArtifactFormComponent,
      ArtifactCardComponent,
      ArtifactForDisplayComponent,
      EditArtifactComponent,
      PutArtifactIntoRoomPromptComponent,
    ],
    imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      FontAwesomeModule,  
      MaterialModule
    ],
    exports: [
      ArtifactFormComponent
    ]
  })
  export class ItemsModule { 
  
  }