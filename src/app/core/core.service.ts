import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Hit, News } from '../main/interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private hitStore$: BehaviorSubject<Hit[]> = new BehaviorSubject<Hit[]>([])
  
  /* Creating a new BehaviorSubject with an empty array. */
  private newsStore$: BehaviorSubject<News> = new BehaviorSubject<News>({
    hits:                [],
    nbHits:              0,
    page:                0,
    nbPages:             0,
    hitsPerPage:         0,
    exhaustiveNbHits:    false,
    exhaustiveTypo:      false,
    params:              '',
    processingTimeMS:    0,
  })

 /**
  * The function returns the observable of the newsStore$ property
  * @returns Observable
  */
  get newsStore(){
    return this.newsStore$.asObservable()
  }

  /**
   * The function returns an observable of the hitStore$ property
   * @returns The observable
   */
  get hitStore() {
    return this.hitStore$.asObservable()
  }

  /**
   * The function takes an array of hits and sets the hitStore$ to the value of the array
   * @param {Hit[]} hits - Hit[] - this is the array of hits that we want to store in the store.
   */
  set hitData(hits:Hit[]) {
    this.hitStore$.next(hits)
  }
  
 /**
  * The function takes in a news object and sets the newsStore$ to the value of the news object
  * @param {News} news - News - this is the data that we want to pass to the store
  */
  set newsData(news:News) {
    this.newsStore$.next(news)
  }

}
