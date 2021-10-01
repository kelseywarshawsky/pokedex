import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss']
})

export class PokeCardComponent implements OnInit {
  @Input() pokemon!: Pokemon;

  constructor() { }

  ngOnInit(): void {
  }

}
