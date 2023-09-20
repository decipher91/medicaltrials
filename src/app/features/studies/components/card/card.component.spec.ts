import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudiesService } from '../../services/studies.service';
import { StydyCardComponent } from './card.component';
import { Study } from 'src/app/models/study';

describe('StydyCardComponent', () => {
  let component: StydyCardComponent;
  let fixture: ComponentFixture<StydyCardComponent>;
  let mockStudiesService: jasmine.SpyObj<StudiesService>;

  const mockStudy: Study = {
    protocolSection: {
      identificationModule: {
          nctId: "NCT00142571",
          briefTitle: "Comparison of Gemcitabine v. Gemcitabine Plus Docetaxel in Unresectable Soft Tissue Sarcoma",
      },
      statusModule: {
          overallStatus: "COMPLETED",
          
      },
      descriptionModule: {
          briefSummary: "The purpose of this study is to compare the drug gemcitabine to two drugs, gemcitabine and docetaxel, to find out which treatment is better for people with sarcomas.",
      },
  },
  "hasResults": false
  };

  beforeEach(() => {
    mockStudiesService = jasmine.createSpyObj('StudiesService', [
      'isLiked',
      'addToFavorites',
      'removeFromFavorites',
    ]);

    TestBed.configureTestingModule({
      declarations: [StydyCardComponent],
      providers: [{ provide: StudiesService, useValue: mockStudiesService }],
    });

    fixture = TestBed.createComponent(StydyCardComponent);
    component = fixture.componentInstance;
    component.study = mockStudy;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addToFavorites when not liked and changeFavoritesState is called', () => {
    mockStudiesService.isLiked.and.returnValue(false);

    component.changeFavoritesState();

    expect(mockStudiesService.addToFavorites).toHaveBeenCalledWith(mockStudy);
    expect(mockStudiesService.removeFromFavorites).not.toHaveBeenCalled();
  });

  it('should call removeFromFavorites when liked and changeFavoritesState is called', () => {
    mockStudiesService.isLiked.and.returnValue(true);

    component.changeFavoritesState();

    expect(mockStudiesService.removeFromFavorites).toHaveBeenCalledWith(
      mockStudy.protocolSection.identificationModule.nctId,
    );
    expect(mockStudiesService.addToFavorites).not.toHaveBeenCalled();
  });

  it('should return isLiked status from jokesService', () => {
    mockStudiesService.isLiked.and.returnValue(true);

    const isLiked = component.isLiked;

    expect(isLiked).toBe(true);
    expect(mockStudiesService.isLiked).toHaveBeenCalledWith(mockStudy.protocolSection.identificationModule.nctId);
  });
});
