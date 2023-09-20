import { Component, OnInit } from '@angular/core';
import { StudiesService } from './services/studies.service';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss'],
})
export class StudiesComponent implements OnInit {
  public studies$ = this.studiesService.studies$;

  constructor(private studiesService: StudiesService) {}

  ngOnInit(): void {
    this.studiesService.init();
  }
}
