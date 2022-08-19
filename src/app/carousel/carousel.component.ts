import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  constructor() { }
  slides: Pokemon[] = [];
  activeIndex: number = 0;
  //this searches for 20 random pokemon we can display in the carousel
  allPokeSearch() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => response.json())
      .then(pokemon => {
        const promises = pokemon.results.map((pokemon: { name: string | undefined; }) => {
          new Promise ((resolve, reject) => {
            resolve(this.pokeSearch(pokemon.name))
          })
        })
        Promise.all(promises).then(() => {
          console.log(this.slides);
        })
      })
  }

  pokeSearch(name: string | undefined) {
    if (!name) {
      this.allPokeSearch();
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(pokemon => {
          let thisPoke = {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites?.other['official-artwork']?.front_default ? pokemon.sprites?.other['official-artwork']?.front_default : './assets/images/surprised_pikachu.jpeg',
            height: pokemon.height,
            weight: pokemon.weight,
            abilities: pokemon.abilities.length,
            baseexp: pokemon.base_experience
          }
          this.slides.push(thisPoke);
        });
    }
  }

  onNext() {
    if (this.activeIndex !== this.slides.length - 1) {
    this.activeIndex = (this.activeIndex + 1);
    }
  }

  onPrev() {
    if (this.activeIndex !== 0) {
    this.activeIndex = (this.activeIndex - 1);
    }

  }
  ngOnInit(): void {
    this.allPokeSearch();
  }
}
