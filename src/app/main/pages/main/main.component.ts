import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ItemDataSource } from 'src/app/core/data-source.datasource';
import { CoreService } from '../../../core/core.service';
import { Subscription } from 'rxjs';
import { ServicesService } from '../../../services/services.service';
import { News, Hit } from '../../interface/interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit ,AfterViewInit, OnDestroy {

  /* Setting the threshold for the IntersectionObserver. */
  private options = {
    root: document.querySelector('.main'),
    rootMargin: '0px',
    threshold: 1
  }
  subs!: Subscription
  news!: News
  memoryLead: Hit[] = JSON.parse(localStorage.getItem('hits') || '[]')
  card!: any
  TIMEOUT: number = 1000

  constructor(
    private coreService: CoreService,
    private apiService: ServicesService
  ) { }

  ngOnInit(): void {
    this.getMainData()
  }

  getMainData() {
    if(JSON.parse(localStorage.getItem('data') || '{}')) {
      this.coreService.newsData = JSON.parse(localStorage.getItem('data') || '{}')
      this.coreService.hitData = JSON.parse(localStorage.getItem('data') || '{}')?.hits
    }
  }

  ngAfterViewInit(): void {
    this.subs = this.coreService.newsStore.subscribe((news) => {
      this.memoryLead = []
      this.news = news
      setTimeout(() => {
        if(Object.entries(this.news).length > 0) {
          this.getElement()
        }
      }, this.TIMEOUT);
    })
  }

  ngOnDestroy(): void {
    /* Unsubscribing from the subscription. */
    this.subs.unsubscribe()
  }

  /**
   * A function that is used to lazy load data.
   * @returns The last element in the NodeList of card elements.
   */
  lazy() {
    const Observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entrie => {
        if (entrie.isIntersecting) {
          this.getData()
          observer.unobserve(this.card)
        }
      })
    }, this.options)
    Observer.observe(this.card)
  }

  /**
   * The function gets the data from the API service and assigns it to the newsData object in the core
   * service
   */
  getData() {
    this.apiService.getMainData(this.news.query || '', this.news.page + 1).subscribe({
      next: ({ hits }) => {
        this.memoryLead = [
          ...this.memoryLead,
          ...hits
        ]
        this.coreService.hitData = this.memoryLead
      },
      error: (err) => { console.error(err); },
      complete: () => {
        setTimeout(() => {
          this.getElement()
        }, this.TIMEOUT);
      }
    })
  }

  getElement() {
    this.card = document.querySelector('.card__container')?.lastElementChild
    this.lazy()
  }

}
