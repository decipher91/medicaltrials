import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StudiesService, STUDIES_REFRESH_INTERVAL } from './studies.service';
import { of } from 'rxjs';
import { Study } from 'src/app/models/study';

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
  hasResults: false,
}

const id = mockStudy.protocolSection.identificationModule.nctId;

describe('StudiesService', () => {
  let service: StudiesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudiesService],
    });
    service = TestBed.inject(StudiesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('likes');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add study to favorites and remove it', () => {

    service.addToFavorites(mockStudy);

    expect(service.favoritesSubject.value).toEqual([mockStudy]);
    expect(localStorage.getItem('likes')).toEqual(JSON.stringify([mockStudy]));

    service.removeFromFavorites(id);
    expect(service.favoritesSubject.value).toEqual([]);
    expect(localStorage.getItem('likes')).toEqual(JSON.stringify([]));
  });

  it('should check if study is liked', () => {

    service.addToFavorites(mockStudy);
    expect(service.isLiked(id)).toBeTrue();

    service.removeFromFavorites(id);
    expect(service.isLiked(id)).toBeFalse();
  });
});
