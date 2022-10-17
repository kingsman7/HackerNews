import { Component, HostListener, OnInit } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  selectValue!: string;
  stickyClass: boolean = false
  stayClass: boolean = false
  tag: string | null = null
  isOpen:boolean =  false
  selected: string = 'Select your news'

  constructor(
    private apiServices: ServicesService,
    private coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.setData()
  }

  handlerSelect(){
    this.isOpen = !this.isOpen
  }

  /**
   * We're setting the value of the search bar to the query that was stored in local storage
   */
  setData() {
    this.selectValue = JSON.parse(localStorage.getItem('data') || `[]` )?.query
  }

  /**
   * It takes the value of the search input, clears the local storage, and then calls the getMainData
   * function from the apiServices service
   * @param {any} event - any - the event that is triggered when the user selects a value from the
   * dropdown.
   */
  getData(option: string) {
    this.selected = option
    localStorage.clear()
    this.apiServices.getMainData(option, 0).subscribe({
      next: (data) => {
        localStorage.setItem('data', JSON.stringify(data))
        localStorage.setItem('hits', JSON.stringify(data.hits))
        this.coreService.newsData = JSON.parse(localStorage.getItem('data') || `[]`)
        this.coreService.hitData = JSON.parse(localStorage.getItem('hits') || `[]`)
      },
      error: (err) => { console.error(err); },
      complete: () => { }
    })
  }

  scroll(el: HTMLElement, tap: number) {
    this.tag = el.getAttribute('id');
    el.scrollIntoView();
  }

  /** Function to make fixed the taps of the page when scrolling. */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 145) {
      this.stickyClass = true;
      this.stayClass = true;
    } else {
      this.stickyClass = false;
      this.stayClass = false;
    }
  }

}
