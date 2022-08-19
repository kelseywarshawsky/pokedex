import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.scss']
})
export class CarouselCardComponent implements OnInit {
  @Input() pokemon!: Pokemon;
  @Input() index!: number;
  @Input() activeIndex!: number;
  constructor() { }

  ngOnInit(): void {
    console.log(this.index, this.activeIndex)
  }
}
