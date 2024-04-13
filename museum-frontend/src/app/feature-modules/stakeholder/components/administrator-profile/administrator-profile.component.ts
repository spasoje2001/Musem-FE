import { Component, OnInit } from '@angular/core';
import { Administrator } from '../../model/administrator.model';
import { AdministratorService } from '../../services/administrator.service';

@Component({
  selector: 'app-administrator-profile',
  templateUrl: './administrator-profile.component.html',
  styleUrls: ['./administrator-profile.component.css', '../shared-styles.css']
})
export class AdministratorProfileComponent implements OnInit {

  administrator?: Administrator;

  constructor(
    private administratorService: AdministratorService
  ) { }
  
  ngOnInit(): void {
    this.loadAdministrator();
  }
  
  loadAdministrator(): void {
    this.administratorService.getLoggedInAdministrator().subscribe(administrator => {
      this.administrator = administrator;
    });
  }

}
