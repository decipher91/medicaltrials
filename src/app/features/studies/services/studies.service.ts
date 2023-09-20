import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, toArray } from 'rxjs';
import { StudiesResponse, Study } from 'src/app/models/study';

export const VISIBLE_STUDIES_LENGTH = 10;
export const STUDIES_REFRESH_INTERVAL = 5000;
export const MAX_LIKES = 10;
export const API_URL = "https://clinicaltrials.gov/api/v2";

@Injectable({
  providedIn: 'root',
})
export class StudiesService {
  studiesSubject = new BehaviorSubject<Study[]>([]);
  studies$ = this.studiesSubject.asObservable();

  favoritesSubject = new BehaviorSubject<Study[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  _fetchNewTrialInterval: number | undefined;

  private nextPageToken: string = "";

  constructor(private http: HttpClient) {
    this.favoritesSubject.next(this.getFavorites());
  }

  init(): void {
    this.fetchStudies()
      .subscribe((result: StudiesResponse) => {
        this.studiesSubject.next(result.studies);
        this.nextPageToken = result.nextPageToken;
        this.setFetchNewStudyInterval();
      });
  }

  getFavorites(): Study[] {
    return JSON.parse(localStorage.getItem('likes') || '[]');
  }

  addToFavorites(trial: Study): boolean {
    const likes = this.favoritesSubject.value;
    if (likes.length < MAX_LIKES) {
      likes.push(trial);
      this.saveFavorites(likes);
      return true;
    } else {
      return false;
    }
  }

  removeFromFavorites(id: string): void {
    const likes = this.favoritesSubject.value.filter((item) => item.protocolSection.identificationModule.nctId !== id);
    this.saveFavorites(likes);
  }

  isLiked(id: string): boolean {
    const likes = this.favoritesSubject.value;
    return !!likes.find((item) => {
      console.log(item)
      return item.protocolSection.identificationModule.nctId === id
    });
  }

  private setFetchNewStudyInterval(): void {
    // no need to clear interval since service is provided in root
    this._fetchNewTrialInterval = window.setInterval(() => {
      this.fetchStudies().subscribe((response: StudiesResponse) => {
        this.nextPageToken = response.nextPageToken;
        console.log(response.studies);
        const studies = this.studiesSubject.value;
        studies.shift();
        studies.push(response.studies[0]);
        this.studiesSubject.next(studies);
      });
    }, STUDIES_REFRESH_INTERVAL);
  }

  private fetchStudies(): Observable<StudiesResponse> {
    return this.nextPageToken ? 
      this.http.get<StudiesResponse>(`${API_URL}/studies?pageToken=${this.nextPageToken}&pageSize=1`) : 
      this.http.get<StudiesResponse>(`${API_URL}/studies`);
  }

  private saveFavorites(likes: Study[]): void {
    this.favoritesSubject.next(likes);
    localStorage.setItem('likes', JSON.stringify(likes));
  }
}
