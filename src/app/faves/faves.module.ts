import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavesRoutingModule } from './faves-routing.module';
import { FavesComponent } from './pages/faves/faves.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FavesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FavesRoutingModule
  ]
})
export class FavesModule { }
