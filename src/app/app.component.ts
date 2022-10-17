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
    this.coreService.newsData = JSON.parse(localStorage.getItem('data') || `[]`)
    this.coreService.hitData = JSON.parse(localStorage.getItem('hits') || `[]`)
  }
}
