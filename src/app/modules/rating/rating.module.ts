import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './pages/rating/rating.component';
import { RatingRoutingModule } from './rating-routing.module';



@NgModule({
  declarations: [
    RatingComponent
  ],
  imports: [
    CommonModule,
    RatingRoutingModule
  ]
})
export class RatingModule { }
