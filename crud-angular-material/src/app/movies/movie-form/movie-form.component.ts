import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService, Movie } from '../../services/movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule]
})
export class MovieFormComponent implements OnInit {
  movieForm!: FormGroup;
  movieId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      actors: ['', Validators.required],
      director: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    this.movieId = id ? +id : null;

    if (this.movieId) {
      this.movieService.getMovieById(this.movieId).subscribe((movie) => {
        this.movieForm.patchValue(movie);
      });
    }
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const movie: Movie = this.movieForm.value;
      if (this.movieId) {
        movie.id = this.movieId;
        this.movieService.updateMovie(movie).subscribe(() => this.router.navigate(['/movies']));
      } else {
        this.movieService.createMovie(movie).subscribe(() => this.router.navigate(['/movies']));
      }
    }
  }

  // Método para navegar a /movies
  goBack(): void {
    this.router.navigate(['/movies']);
  }
}
