import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'movies',
    loadComponent: () => import('./movies/movie-list/movie-list.component').then(m => m.MovieListComponent)
  },
  {
    path: 'movies/new',
    loadComponent: () => import('./movies/movie-form/movie-form.component').then(m => m.MovieFormComponent)
  },
  {
    path: 'movies/edit/:id',
    loadComponent: () => import('./movies/movie-form/movie-form.component').then(m => m.MovieFormComponent)
  },
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full' // Asegúrate de que sea "full" o "prefix"
  }
];
