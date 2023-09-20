import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { StudiesService } from '../services/studies.service';
import { BehaviorSubject } from 'rxjs';
import { Study } from 'src/app/models/study';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let mockStudiesService: jasmine.SpyObj<StudiesService>;

  beforeEach(() => {
    mockStudiesService = jasmine.createSpyObj('StudiesService', ['init']);
    mockStudiesService.favorites$ = new BehaviorSubject<Study[]>([]);

    TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      providers: [{ provide: StudiesService, useValue: mockStudiesService }],
    });

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
