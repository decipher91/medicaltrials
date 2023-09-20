import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudiesComponent } from './studies.component';
import { StudiesService } from './services/studies.service';
import { of } from 'rxjs';

describe('StudiesComponent', () => {
  let component: StudiesComponent;
  let fixture: ComponentFixture<StudiesComponent>;
  let mockStudiesService: jasmine.SpyObj<StudiesService>;

  beforeEach(() => {
    mockStudiesService = jasmine.createSpyObj('StudiesService', ['init']);
    mockStudiesService.studies$ = of([]);

    TestBed.configureTestingModule({
      declarations: [StudiesComponent],
      providers: [{ provide: StudiesService, useValue: mockStudiesService }],
    });

    fixture = TestBed.createComponent(StudiesComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call studiesService.init on ngOnInit', () => {
    component.ngOnInit();

    expect(mockStudiesService.init).toHaveBeenCalled();
  });
});
