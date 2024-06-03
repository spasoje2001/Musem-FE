import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { RequestsJournal } from "../../model/requestsJournal.model";
import { Guest } from "../../../stakeholder/model/guest.model";
import { ToursService } from "../../tours.service";
import {PersonalTourRequest} from "../../model/personalTourRequest.model";
import {Exhibition} from "../../../exhibitions/model/exhibition.model";

@Component({
  selector: 'app-requests-journal-card-view',
  templateUrl: './requests-journal-card-view.component.html',
  styleUrls: ['./requests-journal-card-view.component.css']
})
export class RequestsJournalCardViewComponent implements OnInit {
  @Input() journal!: RequestsJournal;
  tourOccurrenceTime: string = "";
  tourOccurrenceDate: string = "";
  journalOccurrenceTime: string = "";
  journalOccurrenceDate: string = "";
  @Output() dialogRefClosed: EventEmitter<any> = new EventEmitter<any>();
  personalTourRequests: PersonalTourRequest[] = [];
  exhibitionsString: string = "";

  constructor(private toursService: ToursService) {
  }

  ngOnInit() {
    const tourOccurrenceDateTimeString = this.journal.occurrenceDateTime.toString();
    [this.tourOccurrenceDate, this.tourOccurrenceTime] = tourOccurrenceDateTimeString.split('T');

    const journalOccurrenceDateTimeString = this.journal.dat.toString();
    [this.journalOccurrenceDate, this.journalOccurrenceTime] = journalOccurrenceDateTimeString.split('T');

    if(this.journal.proposerId){
      this.toursService.getGuestById(this.journal.proposerId).subscribe({
        next : (result: Guest) => {
          this.journal.proposer = result;
        }
      });
    }

    if(this.journal.personalTourRequestId){
      this.toursService.getTourRequests().subscribe({
        next: (result: PersonalTourRequest[] | PersonalTourRequest) => {
          if(Array.isArray(result)){
            this.personalTourRequests = result;

            this.personalTourRequests.forEach((request, index) => {
              if(request.id == this.journal.personalTourRequestId){
                request.exhibitions!.forEach((exhibition: Exhibition) => {
                  this.exhibitionsString += exhibition.name + ", ";
                });

                this.exhibitionsString = this.exhibitionsString.slice(0, -2);
              }
            });
          }
        }
      })
    }
  }


}
