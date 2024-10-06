import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http'; // Para las peticiones HTTP

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes), // Configuración de rutas
    provideHttpClient() // Para HTTP requests
  ]
}).catch(err => console.error(err));
