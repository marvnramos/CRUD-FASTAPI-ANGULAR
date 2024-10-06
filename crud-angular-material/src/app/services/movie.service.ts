import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';


export interface Movie {
  id: number;
  name: string;
  description: string;
  actors: string;  // Lista de actores en formato string
  director: string;
}


@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  // GET /items - Obtener todas las películas
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/items`);
  }

  // GET /items/{item_id} - Obtener una película por ID
  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/items/${id}`);
  }

  // POST /items - Crear una nueva película
  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/items`, movie);
  }

  // PUT /items/{item_id} - Actualizar una película por ID
  updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/items/${movie.id}`, movie);
  }

  // DELETE /items/{item_id} - Eliminar una película por ID
  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/items/${id}`);
  }
}
