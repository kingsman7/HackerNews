import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { News } from '../main/interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor( private http:HttpClient ) { }

/**
 * It takes in two parameters, a string and a number, and returns an Observable of type News
 * @param {string} famework - The name of the framework you want to search for.
 * @param {number} page - The page number of the news you want to get.
 * @returns An observable of type News
 */
  getMainData(famework: string, page: number):Observable<News>{
    return this.http.get<News>(`${environment.URL}/v1/search_by_date?query=${famework}&page=${page}`)
  }

 /**
  * This function takes a page number as an argument and returns an observable of type News
  * @param {number} page - number - the page number of the results you want to get
  * @returns An observable of type News
  */
  getFaves(page:number):Observable<News> {
    return this.http.get<News>(`${environment.URL}/v1/search_by_date?query=faves&page=${page}`)
  }
}
