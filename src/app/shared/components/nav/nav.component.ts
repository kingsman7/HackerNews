import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  stickyClass: boolean = false
  stayClass: boolean = false
  tag: string | null = null

  constructor() { }

  ngOnInit(): void {
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
