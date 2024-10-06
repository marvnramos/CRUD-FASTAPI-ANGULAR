import { Component, OnInit } from '@angular/core';
import { MovieService, Movie } from '../../services/movie.service';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule] // Importa los módulos necesarios
})
export class MovieListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'actors', 'director', 'actions'];
  dataSource: MatTableDataSource<Movie> = new MatTableDataSource<Movie>();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(
      (movies) => {
        console.log('Películas recibidas:', movies);  // Depuración para verificar si los datos están llegando
        this.dataSource.data = movies;
      },
      (error) => {
        console.error('Error al obtener las películas:', error);
      }
    );
  }

  deleteMovie(id: number): void {
    this.movieService.deleteMovie(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(movie => movie.id !== id);
    });
  }
}
