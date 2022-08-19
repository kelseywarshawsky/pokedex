import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PokeCardComponent } from './poke-card/poke-card.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselCardComponent } from './carousel-card/carousel-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PokeCardComponent,
    SearchResultsComponent,
    CarouselComponent,
    CarouselCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
  { path: '', component: SearchResultsComponent },
  { path: 'carousel', component: CarouselComponent },
])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
