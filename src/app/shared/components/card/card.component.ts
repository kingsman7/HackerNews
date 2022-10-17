import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hit } from 'src/app/main/interface/interfaces';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {

  subs!: Subscription;
  hits: Hit[] = [];

  constructor(private coreService:CoreService) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.subs = this.coreService.hitStore.subscribe( (hits) => {
      this.hits = hits
    })
  }

  isOk(hit:Hit) {
    const { author, story_title, story_url, created_at } = hit
    const obj = {
      author,
      story_title,
      story_url,
      created_at
    }
    return Object.entries(obj).every(item => item[1] !== null)
  }

}
