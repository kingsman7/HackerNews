import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { News } from '../main/interface/interfaces'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor( private http:HttpClient ) { }

/**
 * It takes in two parameters, a string and a number, and returns an Observable of type News
 * @param {string} option - The name of the framework you want to search for.
 * @param {number} page - The page number of the news you want to get.
 * @returns An observable of type News
 */
  getMainData(option: string, page: number):Observable<News>{
    let params = new HttpParams()
    params = params.append('query', option)
    params = params.append('page', page)
    return this.http.get<News>(`${environment.URL}/v1/search_by_date`, {params})
  }
}
