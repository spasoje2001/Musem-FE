import { Component, OnInit } from '@angular/core';
import { Curator } from '../../model/curator.model';
import { CuratorService } from '../../services/curator.service';
import { MatDialog } from '@angular/material/dialog';
import { PdfCuratorExhibitionsPromptComponent } from 'src/app/feature-modules/exhibitions/pdf-curator-exhibitions-prompt/pdf-curator-exhibitions-prompt.component';

@Component({
  selector: 'app-curator-profile',
  templateUrl: './curator-profile.component.html',
  styleUrls: ['./curator-profile.component.css', '../shared-styles.css']
})
export class CuratorProfileComponent implements OnInit {

  curator?: Curator;
  requestsReportButtonState: string = "";

  private dialogRef: any;

  constructor(
    private curatorService: CuratorService,
    private dialog: MatDialog
  ) { }
  
  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadCurator();
  }
  
  loadCurator(): void {
    this.curatorService.getLoggedInCurator().subscribe(curator => {
      this.curator = curator;
    });
  }



  openOrganizerExhibitionsReportDialogue(): void {
    this.requestsReportButtonState = 'clicked';
    setTimeout(() => { this.requestsReportButtonState = 'idle'; }, 200);
    this.dialogRef = this.dialog.open(PdfCuratorExhibitionsPromptComponent, {
    });

    if (this.dialogRef) {
      this.dialogRef.afterClosed().subscribe((result: any) => {
        this.loadData();
      });
    }
  }

}
