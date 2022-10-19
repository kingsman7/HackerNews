import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hit, News } from 'src/app/main/interface/interfaces';
import { ServicesService } from 'src/app/services/services.service';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-faves',
  templateUrl: './faves.component.html',
  styleUrls: ['./faves.component.css']
})
export class FavesComponent implements OnInit, AfterViewInit, OnDestroy {

  private options: IntersectionObserverInit = {
    rootMargin: '0px',
    threshold: 1
  }
  subs!: Subscription
  news!: News
  memoryLead: Hit[] = JSON.parse(localStorage.getItem('hits') || '[]')
  card: Element = document.createElement('div')
  TIMEOUT: number = 1000
  page: number = 0
  isLoading:boolean = false

  constructor(
    private coreService: CoreService,
    private apiService: ServicesService
  ) { }

  ngOnInit(): void {
    this.getFaves()
  }

  ngAfterViewInit(): void {
    this.setFavData()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }


  /**
   * The function gets the faves from the local storage and sets the newsData and hitData to the faves
   */
  getFaves() {
    localStorage.clear
    this.apiService.getFaves(this.page).subscribe({
      next: (news) => {
        localStorage.setItem('faves', JSON.stringify(news))
        localStorage.setItem('favesHits', JSON.stringify(this.addFav(news.hits)))
        this.coreService.newsData = JSON.parse(localStorage.getItem('faves') || '[]')
        this.coreService.hitData = JSON.parse(localStorage.getItem('favesHits') || '[]')
      },
      error: (err) => { console.log("~ file: faves.component.ts ~ line 55 ~ FavesComponent ~ this.apiService.getFaves ~ err", err) },
      complete: () => { }
    })
  }

  /**
   * It takes an array of hits, maps over them, sets the fav property to true, and returns the array of
   * hits
   * @param {Hit[]} hits - Hit[] - this is the array of hits that we're going to map over.
   * @returns a new array with the fav property set to true.
   */
  addFav(hits: Hit[]): Hit[] {
    return hits.map((hit) => {
      hit.fav = true
      return hit
    })
  }

  /**
   * The function is called when the user clicks on the favorite button. The function then subscribes
   * to the newsStore and stores the news in the memoryLead array
   */
  setFavData() {
    this.subs = this.coreService.newsStore.subscribe((news) => {
      this.memoryLead = []
      this.news = news
      setTimeout(() => {
        this.getElement()
      }, this.TIMEOUT);
    })
  }

  /**
   * The function creates a new IntersectionObserver object, which takes two arguments: a callback
   * function and an options object. The callback function takes two arguments: entries and observer.
   * The entries argument is an array of all the elements that are being observed. The observer argument
   * is the IntersectionObserver object itself. The callback function loops through the entries array
   * and checks if the element is intersecting. If it is, the function calls the getData() function,
   * which fetches the data from the API and appends it to the DOM. The observer.unobserve() method
   * stops observing the element. The Observer.observe() method observes the element
   */
  lazy() {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entrie => {
        if (entrie.isIntersecting) {
          this.getData()
          observer.unobserve(this.card)
        }
      })
    }, this.options)
    observer.observe(this.card)
  }

  /**
   * The function gets the data from the API and stores it in the memoryLead array
   */
  getData() {
    this.isLoading = true
    this.apiService.getFaves(this.news.page + 1).subscribe({
      next: (news) => {
        this.news = news
        this.memoryLead = [
          ...this.memoryLead,
          ...news.hits
        ]
        this.coreService.hitData = this.memoryLead
      },
      error: (err) => { console.log(" ~ file: faves.component.ts ~ line 120 ~ FavesComponent ~ this.apiService.getFaves ~ err", err); },
      
      complete: () => {
        this.isLoading = false
        setTimeout(() => {
          this.getElement()
        }, this.TIMEOUT);
      }
    })
  }

  /**
   * It gets the last element of the card container and then calls the lazy function.
   */
  getElement() {
    this.card = document.querySelector('.card__container')?.lastElementChild || this.card
    this.lazy()
  }
}
