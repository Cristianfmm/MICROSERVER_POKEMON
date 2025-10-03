import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PokemonDetailComponent], 
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  page = 1;
  limit = 20;
  selectedPokemon: string | null = null;

  
  searchTerm: string = '';
  filteredPokemons: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokemonService.getPokemons(this.page, this.limit).subscribe({
      next: (data) => {
        this.pokemons = data.results;
        this.filteredPokemons = []; 
      },
      error: (err) => console.error('Error cargando lista de Pokémon', err)
    });
  }

  selectPokemon(name: string): void {
    this.selectedPokemon = name;
    this.searchTerm = ''; 
    this.filteredPokemons = [];
  }

  
  loadPage(newPage: number): void {
    if (newPage < 1) return;
    this.page = newPage;
    this.loadPokemons();
  }


  filterPokemons(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredPokemons = this.pokemons.filter((p: any) =>
      p.name.toLowerCase().includes(term)
    );
  }
}
