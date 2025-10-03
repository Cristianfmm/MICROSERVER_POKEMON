import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 necesario para [(ngModel)]
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PokemonDetailComponent], // 👈 añadimos FormsModule
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  page = 1;
  limit = 20;
  selectedPokemon: string | null = null;

  // 🔎 variables buscador
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
        this.filteredPokemons = []; // limpiamos sugerencias al cambiar de página
      },
      error: (err) => console.error('Error cargando lista de Pokémon', err)
    });
  }

  selectPokemon(name: string): void {
    this.selectedPokemon = name;
    this.searchTerm = ''; // limpiamos input al seleccionar
    this.filteredPokemons = [];
  }

  // ⏮️⏭️ Paginación
  loadPage(newPage: number): void {
    if (newPage < 1) return;
    this.page = newPage;
    this.loadPokemons();
  }

  // 🔎 Filtro buscador
  filterPokemons(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredPokemons = this.pokemons.filter((p: any) =>
      p.name.toLowerCase().includes(term)
    );
  }
}
