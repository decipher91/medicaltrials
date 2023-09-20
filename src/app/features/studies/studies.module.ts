import { NgModule } from '@angular/core';
import { StudiesComponent } from './studies.component';
import { StudiesRoutingModule } from './studies-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StudiesService } from './services/studies.service';
import { StydyCardComponent } from './components/card/card.component';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [StudiesComponent, StydyCardComponent, FavoritesComponent],
  imports: [CommonModule, StudiesRoutingModule, HttpClientModule],
  providers: [StudiesService],
})
export class StudiesModule {}
