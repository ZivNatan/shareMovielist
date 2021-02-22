import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovies(text: string): Observable<any> {
    return this.http.get('https://api.themoviedb.org/3/search/movie?api_key=468c3155e3e041a97a5b2569eeadd879&language=en-US&query=' + text + '&page=1&include_adult=false');
  }

  getMovie(id: string): Observable<any> {
    return this.http.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=468c3155e3e041a97a5b2569eeadd879&language=en-US');
  }
  getCrawAndCast(id: string): Observable<any>{
    return this.http.get('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=468c3155e3e041a97a5b2569eeadd879&language=en-US');
  }
}
