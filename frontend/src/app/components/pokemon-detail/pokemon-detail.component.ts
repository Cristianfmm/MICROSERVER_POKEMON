import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemonName: string | null = null;
  pokemon: any = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    if (this.pokemonName) {
      this.loadPokemon(this.pokemonName);
    }
  }

  ngOnChanges(): void {
    if (this.pokemonName) {
      this.loadPokemon(this.pokemonName);
    }
  }

  loadPokemon(name: string): void {
    this.pokemonService.getPokemon(name).subscribe({
      next: (data) => {
        this.pokemon = data;
      },
      error: (err) => {
        console.error('Error cargando Pokémon', err);
        this.pokemon = null;
      }
    });
  }
}
