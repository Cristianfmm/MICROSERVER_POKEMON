import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPokemons(page: number = 1, limit: number = 20): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon?page=${page}&limit=${limit}`);
  }
  
  getPokemon(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon/${name}`);
  }
  
}
