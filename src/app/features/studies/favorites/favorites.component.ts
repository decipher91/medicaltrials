import { Component } from '@angular/core';
import { StudiesService } from '../services/studies.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  favorites$ = this.studiesService.favorites$;

  constructor(private studiesService: StudiesService) {}
}
