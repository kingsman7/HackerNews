import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/main/interface/interfaces';
import { CoreService } from '../../../core/core.service';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  table!:News
  currentPage: number = 0;
  hitsPerPage: number = 0;
  totalPage: number = 0;
  start: number = 0;
  end: number = 0;
  pages: number[] = []

  constructor( 
    private apiService:ServicesService,
    private coreService:CoreService 
    ) { }

  ngOnInit(): void {
   this.setData()
  }

 /**
  * The function setData() is a function that subscribes to the newsStore and sets the table to the
  * newsStore
  */
  setData() {
    this.coreService.newsStore.subscribe((news) => {
      this.table = news
      this.countPage()
    })
  }

/**
 * It takes the value of the page number clicked on, subtracts 1 from it, and passes it to the API
 * service, which then returns the data for that page
 * @param {any} ev - any - this is the event that is triggered when the user clicks on a page number.
 */
  getData(ev: any ) {
    this.apiService.getMainData(this.table.query || '', Number(ev.innerText) - 1).subscribe({
      next: (data) => { this.coreService.newsData = data },
      error: (err) => { console.error(err); },
      complete: () => { }
    })
  }

 /**
  * It takes the current page number, the number of pages, and the number of hits per page, and returns
  * an array of page numbers
  */
  countPage() {
    this.pages = []
     this.currentPage = this.table.page
     this.hitsPerPage = this.table.hits.slice(0, 9).length
     this.totalPage = this.table.nbPages
     this.start = this.currentPage == 0 ? 1 : this.currentPage
     this.end = this.currentPage + this.hitsPerPage > this.totalPage ? this.totalPage : this.currentPage + this.hitsPerPage
     if(this.end === this.totalPage) {
       for (let index = this.end - this.hitsPerPage; index <= this.end; index++) {
        this.pages.push(index)
      }
     }else {
       for (let index = this.start; index <= this.end; index++) {
        this.pages.push(index)
      }
     }
  } 

}
