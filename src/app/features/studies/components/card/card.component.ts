import { Component, Input } from '@angular/core';
import { StudiesService } from '../../services/studies.service';
import { Study } from 'src/app/models/study';

@Component({
  selector: 'app-study-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class StydyCardComponent {
  @Input() study!: Study;

  constructor(private studiesService: StudiesService) {}

  changeFavoritesState(): void {
    this.isLiked
      ? this.studiesService.removeFromFavorites(this.study.protocolSection.identificationModule.nctId)
      : this.studiesService.addToFavorites(this.study);
  }

  get isLiked(): boolean {
    return this.studiesService.isLiked(this.study.protocolSection.identificationModule.nctId);
  }
}
