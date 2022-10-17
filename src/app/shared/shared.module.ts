import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ScrollingModule } from '@angular/cdk/scrolling'

import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { CardComponent } from './components/card/card.component';
import { PaginatorComponent } from './components/paginator/paginator.component';



@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    CardComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ScrollingModule
  ],
  exports: [
    HeaderComponent,
    NavComponent,
    CardComponent,
    PaginatorComponent
  ],
})
export class SharedModule { }
