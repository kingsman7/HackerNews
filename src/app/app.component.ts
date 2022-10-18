import { Component, OnInit } from '@angular/core';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
    /* This is setting the newsData to the value of the localStorage item 'data' or an empty array if
    there is
    no value. */
    this.coreService.newsData = JSON.parse(localStorage.getItem('data') || `[]`)
    /* Setting the hitData to the value of the localStorage item 'hits' or an empty array if there is
    no value. */
    this.coreService.hitData = JSON.parse(localStorage.getItem('hits') || `[]`)
  }
}
