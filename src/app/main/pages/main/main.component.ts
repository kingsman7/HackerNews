import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CoreService } from '../../../core/core.service';
import { Subscription } from 'rxjs';
import { ServicesService } from '../../../services/services.service';
import { News, Hit } from '../../interface/interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {

  /* Setting the threshold for the IntersectionObserver. */
  private options: IntersectionObserverInit = {
    root: document.querySelector('.main'),
    rootMargin: '0px',
    threshold: 1
  };
  subs!: Subscription;
  news!: News;
  memoryLead: Hit[] = JSON.parse(localStorage.getItem('hits') || '[]');
  card: Element = document.createElement('div');
  TIMEOUT: number = 1000
  isLoading:boolean = false

  constructor(
    private coreService: CoreService,
    private apiService: ServicesService
  ) { }

  ngOnInit(): void {
    this.getMainData()
  }

  ngAfterViewInit(): void {
    this.setMainData()
  }

  ngOnDestroy(): void {
    /* Unsubscribing from the subscription. */
    this.subs.unsubscribe()
  }

  /**
   * If there is data in local storage, set the newsData and hitData properties of the coreService to
   * the data in local storage
   */
  getMainData() {
    if (JSON.parse(localStorage.getItem('data') || '{}')) {
      this.coreService.newsData = JSON.parse(localStorage.getItem('data') || '{}')
      this.coreService.hitData = JSON.parse(localStorage.getItem('data') || '{}')?.hits
    }
  }

  /**
   * The function is called when the component is loaded. It subscribes to the newsStore and when the
   * newsStore is updated, it sets the news variable to the new value
   */
  setMainData() {
    this.subs = this.coreService.newsStore.subscribe((news) => {
      this.memoryLead = []
      this.news = news
      setTimeout(() => {
        if (Object.entries(this.news).length > 0) {
          this.getElement()
        }
      }, this.TIMEOUT);
    })
  }

  /**
   * A function that is used to lazy load data.
   * @returns The last element in the NodeList of card elements.
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
   * The function gets the data from the API service and assigns it to the newsData object in the core
   * service
   */
  getData() {
    this.isLoading = true
    this.apiService.getMainData(this.news.query || '', this.news.page + 1).subscribe({
      next: (news) => {
        this.news = news
        this.memoryLead = [
          ...this.memoryLead,
          ...news.hits.map((hit) => {
            hit.fav = false
            return hit
          })
        ]

        this.coreService.hitData = this.memoryLead
      },
      error: (err) => { console.log("🚀 ~ file: main.component.ts ~ line 104 ~ MainComponent ~ this.apiService.getMainData ~ err", err); },
      complete: () => {
        this.isLoading = false
        setTimeout(() => {
          this.getElement()
        }, this.TIMEOUT);
      }
    })
  }

  getElement() {
    this.card = document.querySelector('.card__container')?.lastElementChild || this.card
    this.lazy()
  }

}
