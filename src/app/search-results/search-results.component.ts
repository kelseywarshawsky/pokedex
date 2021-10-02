import { state } from '@angular/animations';
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
  activeResults: Pokemon[] = [];
  pageNumbers: number[] = [];
  indexOfFirstResult: number = 0;
  indexOfLastResult: number = 12;
  resultsPerPage: number = 16;
  activePage: number = 1;

  loadSelectedPage() {
    this.indexOfFirstResult = this.activePage * this.resultsPerPage;
    this.indexOfLastResult = this.indexOfFirstResult + this.resultsPerPage;
    this.activeResults = this.searchResults.slice(this.indexOfFirstResult, this.indexOfLastResult);
  }

  renderPageNumbers() {
    for (
      let i = 1;
      i <= Math.ceil(this.searchResults.length / this.resultsPerPage);
      i++
    ) {
      this.pageNumbers.push(i);
    }
  }

  searchChange(value: string) {
    this.search.search = value;
  }

  onSearch() {
    this.searchResults = [];
    this.pokeSearch(this.search.search)
  }

  onPageSelect(page: number) {
    this.activePage = page;
    this.loadSelectedPage();
  }

  onNext() {
    let nextPage = this.activePage + 1;
    this.activePage = nextPage > this.searchResults.length / this.resultsPerPage + 1 ? this.activePage : nextPage;
    this.loadSelectedPage();
  }

  onPrev() {
    let prevPage = this.activePage - 1;
    this.activePage = prevPage === 0 ? this.activePage : prevPage;
    this.loadSelectedPage();
  }

  allPokeSearch() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(pokemon => {
        const promises = pokemon.results.map((pokemon: { name: string | undefined; }) => {
          new Promise ((resolve, reject) => {
            resolve(this.pokeSearch(pokemon.name))
          })
        })
        Promise.all(promises).then(() => {
          setTimeout(() => {
            this.loadSelectedPage();
            this.renderPageNumbers();
          }, 450)
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
