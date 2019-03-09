import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { URL_CONFIG } from "./app.config";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
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
    return this.http
      .post<any>(
        URL_CONFIG.BASE_URL + URL_CONFIG.GET_SESSION_CLASS_SUBJECTS,
        JSON.stringify(payload),
        httpOptions
      )
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("getSubjectsForSession"))
      );
  }

  insertSubjectForSessionClass(payload) {
    return this.http
      .post<any>(
        URL_CONFIG.BASE_URL + URL_CONFIG.INSERT_SUBJECT_DETAILS,
        JSON.stringify(payload),
        httpOptions
      )
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("insertSubjectForSessionClass"))
      );
  }

  getStudentDetails(payload) {
    return this.http
      .post<any>(
        URL_CONFIG.BASE_URL + URL_CONFIG.GET_STUDENT_DETAILS,
        JSON.stringify(payload),
        httpOptions
      )
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("getStudentDetails"))
      );
  }

  insertStudentMarks(payload) {
    return this.http
      .post<any>(
        URL_CONFIG.BASE_URL + URL_CONFIG.INSERT_STUDENT_MARKS,
        JSON.stringify(payload),
        httpOptions
      )
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("insertStudentMarks"))
      );
  }

  getStudentMarks(payload) {
    return this.http
      .post<any>(
        URL_CONFIG.BASE_URL + URL_CONFIG.GET_STUDENT_MARKS,
        JSON.stringify(payload),
        httpOptions
      )
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("getStudentDetails"))
      );
  }

  getStudentReport(payload) {
    return this.http
      .post<any>(
        URL_CONFIG.BASE_URL + URL_CONFIG.GENERATE_REPORT,
        JSON.stringify(payload),
        httpOptions
      )
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("getStudentDetails"))
      );
  }

  addStudentInfo(payload) {
    return this.http
      .post<any>(
        URL_CONFIG.BASE_URL + URL_CONFIG.ADD_STUDENT_INFO,
        JSON.stringify(payload),
        httpOptions
      )
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("addStudentInfo"))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
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
