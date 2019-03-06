import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { URL_CONFIG } from './app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getSubjectsForSession(payload) {
    return this.http.post<any>(URL_CONFIG.BASE_URL + URL_CONFIG.GET_SESSION_CLASS_SUBJECTS, JSON.stringify(payload), httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getSubjectsForSession'))
    );
  }

  insertSubjectForSessionClass(payload) {
    return this.http.post<any>(URL_CONFIG.BASE_URL + URL_CONFIG.INSERT_SUBJECT_DETAILS, JSON.stringify(payload), httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('insertSubjectForSessionClass'))
    );
  }

  getStudentDetails(payload) {
    return this.http.post<any>(URL_CONFIG.BASE_URL + URL_CONFIG.GET_STUDENT_DETAILS, JSON.stringify(payload), httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getStudentDetails'))
    );
  }

  getProducts(): Observable<any> {
    return this.http.get("https://jsonplaceholder.typicode.com/todos/1").pipe(
      map(this.extractData));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
