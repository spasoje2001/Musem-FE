import { Component, OnInit } from '@angular/core';
import { Restaurateur } from '../../model/restaurateur.model';
import { RestaurateurService } from '../../services/restaurateur.service';

@Component({
  selector: 'app-restaurateur-profile',
  templateUrl: './restaurateur-profile.component.html',
  styleUrls: ['./restaurateur-profile.component.css', '../shared-styles.css']
})
export class RestaurateurProfileComponent implements OnInit {

  restaurateur?: Restaurateur;

  constructor(
    private restaurateurService: RestaurateurService
  ) { }
  
  ngOnInit(): void {
    this.loadRestaurateur();
  }
  
  loadRestaurateur(): void {
    this.restaurateurService.getLoggedInRestaurateur().subscribe(restaurateur => {
      this.restaurateur = restaurateur;
    });
  }

}
