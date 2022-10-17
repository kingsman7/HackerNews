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

  getMainData(famework: string, page: number):Observable<News>{
    return this.http.get<News>(`${environment.URL}/v1/search_by_date?query=${famework}&page=${page}`)
  }

  getFaves(page:number):Observable<News> {
    return this.http.get<News>(`${environment.URL}/v1/search_by_date?query=faves&page=${page}`)
  }
}
