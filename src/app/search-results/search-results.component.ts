import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Search } from '../search';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  search: Search = {
    search: ""
  }

  searchResults: Pokemon[] = [];

  searchChange(value: string) {
    this.search.search = value;
  }

  onClick() {
    this.searchResults = [];
    this.pokeSearch(this.search.search)
  }

  allPokeSearch() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(pokemon => {
        pokemon.results.forEach((pokemon: { name: string | undefined; }) => {
          this.pokeSearch(pokemon.name);
        })
      })
      console.log(this.searchResults);
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
        }
        this.searchResults.push(thisPoke);
      });
    }
  }

  constructor() {
  }

  ngOnInit(): void {
    this.allPokeSearch();
  }

}
