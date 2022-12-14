import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ScrollingModule } from '@angular/cdk/scrolling'

import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { CardComponent } from './components/card/card.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DiffPipe } from './pipes/diff.pipe';
import { SwitchInputComponent } from './components/switch-input/switch-input.component';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    CardComponent,
    PaginatorComponent,
    DiffPipe,
    SwitchInputComponent,
    LoadingComponent
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
    LoadingComponent,
    PaginatorComponent
  ],
})
export class SharedModule { }
