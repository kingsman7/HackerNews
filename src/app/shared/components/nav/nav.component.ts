import { Component, HostListener } from '@angular/core'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  
  stickyClass: boolean = false
  stayClass:   boolean = false
  tag:         string | null = null

/**
 * The function takes two arguments, the first is the element to scroll to, the second is the number of
 * pixels to offset the scroll by
 * @param {HTMLElement} el - HTMLElement - The element that you want to scroll to.
 * @param {number} tap - number - This is the number of times the user has tapped the element.
 */
  scroll(el: HTMLElement, tap: number) {
    this.tag = el.getAttribute('id')
    el.scrollIntoView()
  }

  /** Function to make fixed the taps of the page when scrolling. */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 145) {
      this.stickyClass = true
      this.stayClass = true
    } else {
      this.stickyClass = false
      this.stayClass = false
    }
  }

}
