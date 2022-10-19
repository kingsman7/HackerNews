import { Component, HostListener, OnInit } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
import { CoreService } from '../../../core/core.service';
import { Hit } from '../../interface/interfaces';

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
  isOpen: boolean = false
  selected: string = 'Select your news'

  constructor(
    private apiServices: ServicesService,
    private coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.setData()
  }
  
  /**
   * If the dropdown is open, close it. If the dropdown is closed, open it
   */
  handlerSelect() {
    this.isOpen = !this.isOpen
  }

  /**
   * We're setting the value of the search bar to the query that was stored in local storage
   */
  setData() {
    this.selectValue = JSON.parse(localStorage.getItem('data') || `[]`)?.query
  }

  /**
   * It takes a string as an argument, clears the local storage, calls the getMainData function from
   * the apiServices service, and then sets the local storage with the data returned from the
   * apiServices service
   * @param {string} option - string - The option selected by the user.
   */
  getData(option: string) {
    this.selected = option
    localStorage.clear()
    this.apiServices.getMainData(option, 0).subscribe({
      next: (data) => {
        localStorage.setItem('data', JSON.stringify(data))
        localStorage.setItem('hits', JSON.stringify(this.addFav(data.hits)))
        this.coreService.newsData = JSON.parse(localStorage.getItem('data') || `[]`)
        this.coreService.hitData = JSON.parse(localStorage.getItem('hits') || `[]`)
      },
      error: (err) => { console.log(" ~ file: search.component.ts ~ line 58 ~ SearchComponent ~ this.apiServices.getMainData ~ err", err); },
      complete: () => { }
    })
  }

  /**
   * It takes an array of hits, maps over them, sets the fav property to false, and returns the array of
   * hits
   * @param {Hit[]} hits - Hit[] - this is the array of objects that we are mapping over.
   * @returns An array of objects with a new property called fav.
   */
  addFav(hits: Hit[]): Hit[] {
    return hits.map((hit) => {
      hit.fav = false
      return hit
    })
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
