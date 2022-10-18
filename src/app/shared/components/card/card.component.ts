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
  favIcon:boolean = false
  img:string = '/assets/iconmonstr-favorite-3.png'

  constructor(private coreService:CoreService) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.subs = this.coreService.hitStore.subscribe( (hits) => {
      this.hits = hits
    })
  }
  
  /**
   * If the fav property of the hit object is true, then set it to false. If it's false, then set it to
   * true
   * @param {any} fav - any - this is the fav property of the hit object.
   * @param {number} i - index of the item in the array
   */
  toggleFav(fav: any, i: number) {
    this.hits[i].fav = !fav
  }

/**
 * It takes a hit object and returns true if all of the properties are not null
 * @param {Hit} hit - the object that is returned from the API
 * @returns An array of objects that have the following properties: author, story_title, story_url, and
 * created_at.
 */
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
